import axios from "../../../Common/InterCeptors";
const headers = {
  'Content-Type': 'application/json'
}

export const userSummary =(creds)=>{
  return axios.post('http://localhost:8082/split/userSummy',creds,{ headers });
};
