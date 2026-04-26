import axios from "../../../Common/InterCeptors";
const headers = {
  'Content-Type': 'application/json'
}

export const auth =(creds)=>{
  return axios.post('http://localhost:8082/user/signIn',creds,{ headers });
};
export const register =(creds)=>{
  return axios.post('http://localhost:8082/user/signUp',creds,{ headers });
};