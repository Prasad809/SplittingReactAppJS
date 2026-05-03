import axios from "../../../Common/InterCeptors";
const headers = {
  'Content-Type': 'application/json'
}

export const notify =(creds)=>{
  return axios.post('http://localhost:8082/group/notify',creds,{ headers });
};
export const readNotify =(creds)=>{
  return axios.post('http://localhost:8082/group/readNotify',creds,{ headers });
};
export const penddingNotify =(creds)=>{
  return axios.post('http://localhost:8082/group/pendding',creds,{ headers });
};