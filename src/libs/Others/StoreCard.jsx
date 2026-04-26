import { Step, StepLabel, Stepper } from "@mui/material";
import token from "../common/token";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

function StoreCard() {
  const [userInfo,setUserInfo]=useState({})
  const tknInfo = token.getShowUser();
  const userDeatils=useSelector(state =>state.GetPresentUserReducer)
  useEffect(() => {
    if (userDeatils && userDeatils.user && userDeatils.user.response) {
      setUserInfo(userDeatils.user.response?.studentData)
    }
  }, [userDeatils])

  const steps = [
    { key: 1, value: "Personal Details" },
    { key: 2, value: "Address Details" },
    { key: 3, value: "Miscellaneous Details" },
    { key: 4, value: "Create User Details" }
  ]
  const formatDate = (date) => {
  if (!date) return "---";
  const d = new Date(date);
  if (isNaN(d)) return "---";

  const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};
  
const handleDetails = () => {
  return (
    <div>
      <h2>
        {userInfo.firstName
          ? `${userInfo.firstName}  ${userInfo.middleName}  ${userInfo.lastName}`
          : "----"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <div className="pair">
          <span><strong>Status:</strong> <ToggleSwitch checked={userInfo.isActive} disabled={true}/></span>
          <span><strong>Student Id:</strong> {userInfo.id ? userInfo.id : "----"}</span>
        </div>
        
        <div className="pair">
          <span><strong>State:</strong> {userInfo.state ? userInfo.state : "---"}</span>
        </div>
        
        <div className="pair">
          <span><strong>DOB:</strong> {userInfo.dob ? formatDate(userInfo.dob) : "----"}</span>
          <span>
            <strong>ID Number:</strong>{" "}
            {userInfo.adharNumber
              ? userInfo.adharNumber
              : userInfo.panNumber
              ? userInfo.panNumber
              : userInfo.voterId
              ? userInfo.voterId
              : "----"}
          </span>
        </div>
        
        <div className="pair">
          <span><strong>Email:</strong> {userInfo.email ? userInfo.email : "----"}</span>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="card-stepper">
      {tknInfo === "P" && <Stepper activeStep={0} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.key}>
            <StepLabel>
              {step.value}
            </StepLabel>
          </Step>
        ))}
      </Stepper>}
      {tknInfo === "A" && handleDetails()}
    </div>
  )
}

export default StoreCard;