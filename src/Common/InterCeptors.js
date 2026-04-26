import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import token from "./token";
const instance = axios.create({});

const headers = {
  'Content-Type': 'application/json'
}
const getCmgpd = () => {
  const responseData = axios.get(`http://localhost:8082/cmgpd`, { headers: headers }).then(res=>{
    let data = res?.data
    token.setPiData(data);
  })
  return responseData;
}
let loginDetls = {};
const generateBearToken = async(rt) => {  
  const response = await axios.post(`http://localhost:8082/tokens`, loginDetls, { headers: { ...headers, rt: rt } });
  return response;
}

function AxiosMemory({ children }) {
  const navigate = useNavigate();
  getCmgpd();


  //request
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async(config) => {
        const rtBtTkns = token.getTokens();
        const rtExpTm = token.getExpryTm();
        let timeNow = Date.now();        
        if (rtBtTkns.rt && rtExpTm.btExp <= timeNow) {
            let response = await generateBearToken(rtBtTkns.rt);
            config.headers['rt'] = rtBtTkns.rt;
            config.headers['rt-exp'] = rtExpTm.rtExp;
            config.headers['bt'] = response.headers['bt'];
            config.headers['bt-exp'] = response.headers['bt-exp'];
            token.setTokens({rt:rtBtTkns.rt,bt:response.headers['bt']});
            token.setExpryTm({rtExp:rtExpTm.rtExp,btExp:response.headers['bt-exp']});
        }else{
          if (rtBtTkns?.bt) config.headers['bt'] = rtBtTkns.bt;
          if (rtBtTkns?.rt) config.headers['rt'] = rtBtTkns.rt;
          if (rtExpTm?.btExp) config.headers['bt-exp'] = rtExpTm.btExp;
          if (rtExpTm?.rtExp) config.headers['rt-exp'] = rtExpTm.rtExp;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  });
  
  //response
  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      response => {
        if (response?.status === 400 || response?.status === 500) {
          navigate('/failure');
        }
        const rtTkn = response.headers["rt"] || token.getTokens().rt;
        const btTkn = response.headers["bt"] || token.getTokens().bt;
        const btExp = response.headers["bt-exp"] || token.getExpryTm().btExp;
        const rtExp = response.headers["rt-exp"] || token.getExpryTm().rtExp;
        
        if (btExp || rtExp) {
          token.setExpryTm({ btExp:btExp, rtExp:rtExp });
        }
        if (rtTkn || btTkn) {
          token.setTokens({ rt: rtTkn, bt: btTkn });
        }
        return response;
      },
      error => {
        if (error?.name === "AxiosError") {
          navigate('/failure');
        }
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  });
  instance.defaults.timeout = 60000;
  return children;
}

export default instance;
export { AxiosMemory }
