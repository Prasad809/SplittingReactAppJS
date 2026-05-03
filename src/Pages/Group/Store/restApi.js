import axios from "../../../Common/InterCeptors";
const headers = {
  'Content-Type': 'application/json'
}

export const usersList =(creds)=>{
  return axios.get('http://localhost:8082/split/users',creds,{ headers });
};
export const groupList =(creds)=>{
  return axios.post('http://localhost:8082/group/groupList',creds,{ headers });
};
export const createGroup =(creds)=>{
  return axios.post('http://localhost:8082/group/create',creds,{ headers });
};
export const addMember =(creds)=>{
  return axios.post('http://localhost:8082/group/add',creds,{ headers });
};
export const requestMember =(creds)=>{
  return axios.post('http://localhost:8082/group/request',creds,{ headers });
};
export const approveMember =(creds)=>{
  return axios.post('http://localhost:8082/group/approve',creds,{ headers });
};
export const membersList =(creds)=>{
  return axios.post('http://localhost:8082/group/members',creds,{ headers });
};
export const transGroupList =(creds)=>{
  return axios.post('http://localhost:8082/split/viewTrans',creds,{ headers });
};
export const addExpenses =(creds)=>{
  return axios.post('http://localhost:8082/split/addAmt',creds,{ headers });
};
export const settledBal =(creds)=>{
  return axios.post('http://localhost:8082/split/settle',creds,{ headers });
};