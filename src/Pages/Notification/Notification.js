import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { notifyAction, pendingNotifyAction, readNotifyAction } from "./Store/Action";
import InnerText from "@mui/material/Paper";
import { Grid,Modal } from "@mui/material"
import GlobalDataTable from "../../libs/GlobalDataTable/GlobalDataTable";
import UserCard from "./UserCard";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";

const modalStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: 5,
    height: "40%",
    boaderRadius: "25px",
    padding: "10px"
};
    const formatJoinedAt = (date) => {
        const d = new Date(date);

        return `${d.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
        })}`;
    };


function Notification() {
    const [notifications, setNotifications] = useState([]);
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state?.authReducer);
    const userRefNum = authReducer?.user?.userRefNum;
    const [view, setView] = useState(false);
    const [viewNotify, setViewNotify] = useState({});
    const handleOpenPopUp = (row) => {
        setView(true);
        setViewNotify(row);
        const payload = {
            "userId": userRefNum,
            "notificationId": row.id
        }
        dispatch(readNotifyAction(payload)).then(res => {
            if (res?.payload?.data?.status) {
                handleNotifications();
            }
        });
    };
    const handleClosePopUp = () => {
        setView(false);
        setViewNotify({});
    };
    const columns = [
        { name: "Notification ID", selector: (row) => row.id, sortable: true },
        { name: "Notification Des", selector: (row) => row.message, sortable: true },
        { name: "Group Id", selector: (row) => row.groupId, sortable: true },
        { name: "Invited At", selector: (row) => formatJoinedAt(row.createdAt), sortable: true },
        { name: "View", selector: (row) => <span className="material-symbols-outlined pointer" onClick={() => handleOpenPopUp(row)}>visibility</span>, sortable: true },
    ];
    const conditionalRowStyles = [
        {
            when: (row) => row.isRead == "N",
            style: {
                backgroundColor: "#f0f0f0",
                color: "grey",
                fontWeight: "bold"
            },
        },
        {
            when: (row) => row.isRead == "Y",
            style: {
                fontWeight: "normal"
            },
        },
    ];
    const handleNotifications = () => {
        dispatch(notifyAction({ userId: userRefNum })).then(res => {
            if (res?.payload?.data?.status) {
                setNotifications(res?.payload?.data?.notifications || []);
            }
        })
    };
    useEffect(() => {
        handleNotifications();
    }, []);
    const handleApprove=(groupId)=>{
        const payload={
            "groupId":groupId,
            "userId":userRefNum
        };
        dispatch(pendingNotifyAction(payload)).then(res =>{
            if(res?.payload?.data?.status){
                setView(false);
                setViewNotify({});
            }
            console.log(res)
        })
    }
    return (
        <Grid container>
            <Grid size={3}>
                <UserCard user={authReducer?.user}/>
            </Grid>
            <Grid size={9}>
            <GlobalDataTable columns={columns} data={notifications} conditionalRowStyles={conditionalRowStyles} />
            </Grid>
            <Modal open={view} onClose={handleClosePopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <h3 className="startEnd">
                        Notification Description
                        <span className="material-symbols-outlined pointer" onClick={handleClosePopUp}>Close</span>
                    </h3>
                    <div>
                        <p>Notification : {viewNotify?.message}</p>
                        <p>groupId : {viewNotify?.groupId}</p>
                        <p>referenceId : {viewNotify?.referenceId}</p>
                        <p>Invited At : {formatJoinedAt(viewNotify?.createdAt)}</p>
                    </div>
                   {viewNotify.isRead == "N" && <><div>
                        <strong>Do you Want to Join this Group?</strong>
                    </div>
                    <ButtonThemes name={"YES"} clr={"contained"} funcname={()=>handleApprove(viewNotify?.groupId)}/>
                    <ButtonThemes name={"No"} clr={"outlined"} funcname={handleClosePopUp}/></>}
                </InnerText>
            </Modal>
        </Grid>
    )
}

export default Notification;