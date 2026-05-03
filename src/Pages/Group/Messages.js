import { Grid } from "@mui/material";
import GlobalDataTable from "../../libs/GlobalDataTable/GlobalDataTable";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import { useDispatch } from "react-redux";
import { approveMemberAction } from "./Store/Action";


function Messages({requestData,groupId,close}) {
    const dispatch = useDispatch();
    const handleApproveMem=(item)=>{
        const payload={
            "groupId":groupId,
            "userId":item.userId
        }
        dispatch(approveMemberAction(payload)).then(res =>{
            if(res?.payload?.data?.status){
                close();
            }
        })
    }
    const columns = [
        { "name": "User Name", selector: row => row?.name, sortable: true },
        { "name": "User Email", selector: row => row?.email, sortable: true },
        { "name": "Phone Number", selector: row => row?.phone, sortable: true },
        { "name": "Action", selector: row => <ButtonThemes name={"Approve"} clr={"contained"} funcname={()=>handleApproveMem(row)}/>, sortable: true },
    ];
    return (
        <Grid>
            <GlobalDataTable columns={columns} data={requestData} />
        </Grid>
    )
}

export default Messages;