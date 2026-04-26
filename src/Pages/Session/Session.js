import { useNavigate } from "react-router-dom";
import session from "../../Images/session.png";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";

function Session() {
    const navigate=useNavigate();
  return (
    <div className="session">
      <img
        src={session}
        alt="session"
        style={{
          maxWidth: "300px",
          width: "100%",
          height: "auto"
        }}
      />

      <h4>Session Time Out</h4>
      <ButtonThemes name={"Go To Login"} clr={"contained"} funcname={()=>navigate("/Login")}/>
    </div>
  );
}

export default Session;