import { Box, Button, Divider, FormControl, Grid, MenuItem, Modal, Paper, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberAction, groupListAction, memberListAction, userListAction } from "./Store/Action";
import { useNavigate } from "react-router-dom";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import Textfield from "../../libs/TextField/Textfield";
import InnerText from "@mui/material/Paper"
import { Form, Formik } from "formik";
import * as Yup from "yup"
import Dropdown from "../../libs/Dropdown/Dropdown";
import AlertMsg from "../../libs/SoftAlert/AlertBox";
import token from "../../Common/token";

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
const modalStyle2 = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: 5,
    height: "auto",
    boaderRadius: "25px",
    padding: "10px"
};

const initiavls = {
    groupName: "",
    memberName: ""
};

const listValidation = Yup.object().shape({
    groupName: Yup.string().required("Group Name Should Not be left blank"),
    memberName: Yup.string().required("Select Member to add to this Group.")
})


function GroupsDetails() {
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state?.authReducer);
    const userRefNum = authReducer?.user?.userRefNum;
    const group = token.getGroupDtls();
    const [users, setUsers] = useState([]);
    const [initialVals, setInitialVals] = useState(initiavls);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [errStatus, setErrStatus] = useState("");
    const errClose = () => setErrStatus("");

    const [errAddStatus, setErrAddStatus] = useState("");
    const errAddClose = () => setErrAddStatus("");

    const usersList = () => {
        dispatch(userListAction()).then((res) => {
            if (res?.payload?.data?.status) {
                const response = res?.payload?.data?.users;
                const filtered = response?.filter(user => user.id !== userRefNum);
                setUsers(filtered || []);
            }
        });
    };

    useEffect(()=>{
        usersList();
    },[]);
    const [openList, setOpenList] = useState(false);
    const [viewMembers, setViewMembers] = useState([]);
    const [viewPopUp, setViewPopUp] = useState(false);
    const handleOpenListPopUp = (group, info) => {
        if (info == "add") {
            setInitialVals({
                groupName: group.groupName,
                memberName: ""
            });
            setSelectedGroup(group);
            setOpenList(true);
        } else {
            dispatch(memberListAction({ "groupId": group.groupId })).then(res => {
                if (res?.payload?.data?.status) {
                    setViewMembers(res?.payload?.data?.members)
                };
            });
            setViewPopUp(true);
        }
    };
    const handleCloseListPopUp = () => {
        setOpenList(false);
        setSelectedGroup({});
        setViewPopUp(false);
    };

    const handleAddPersonToGroup = (values) => {
        const payload = {
            "groupId": selectedGroup?.groupId,
            "addedBy": userRefNum,
            "userId": values?.memberName
        }
        dispatch(addMemberAction(payload)).then(res => {
            if (res?.payload?.data?.status) {
                handleCloseListPopUp();
                usersList();
            } else {
                setErrAddStatus(res?.payload?.data?.message?.[0]?.description);
            }
        })
    };

    const formatJoinedAt = (date) => {
        const d = new Date(date);

        return `Joined since ${d.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
        })}`;
    };

    return (
        <Paper elevation={0}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="group-card">
                        <div>
                            <h3 className="startEnd">Group Number : {group.groupId}
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenListPopUp(group, "view")}><Tooltip title={"View Group Members"}>family_group</Tooltip></span>
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenListPopUp(group, "add")}><Tooltip title={"Add Member"}>person_add</Tooltip></span>
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenListPopUp(group)}><Tooltip title={"Group Transctions"}>receipt</Tooltip></span>
                            </h3>
                            <h3>Group Name : {group.groupName}</h3>
                            <p className="group-description">
                                Group Description : {group?.description}
                            </p>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Modal open={openList} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"} />
                    <h3 className="startEnd">
                        Add Membet to this Group
                        <span className="material-symbols-outlined pointer" onClick={handleCloseListPopUp}>Close</span>
                    </h3>
                    <Formik initialValues={initialVals} validationSchema={listValidation} onSubmit={(values) => handleAddPersonToGroup(values)} enableReinitialize={true}
                    >
                        {({ values, handleChange, handleBlur, touched, errors }) => (
                            <Form >
                                <Grid size={12} spacing={2} rowSpacing={2}>
                                    <Grid size={6}>
                                        <label>Group Name</label>
                                        <FormControl fullWidth>
                                            <Textfield
                                                name={"groupName"}
                                                value={values.groupName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.groupName && Boolean(errors.groupName)}
                                                helperText={touched.groupName && errors.groupName}
                                                disabled={true}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <label>Add Member</label>
                                        <FormControl fullWidth>
                                            <Dropdown
                                                name={"memberName"}
                                                value={values.memberName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.memberName && Boolean(errors.memberName)}
                                                helperText={touched.memberName && errors.memberName}
                                                list={users?.map(user => (
                                                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                                ))}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid style={{ marginTop: "10px", textAlign: "end" }}>
                                        <ButtonThemes
                                            typ={"submit"}
                                            clr={"contained"}
                                            name={"Submit"}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>)}
                    </Formik>
                </InnerText>
            </Modal>
            <Modal open={viewPopUp} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle2}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"} />
                    <h3 className="startEnd">
                        Group Members
                        <span className="material-symbols-outlined pointer" onClick={handleCloseListPopUp}>Close</span>
                    </h3>
                    {viewMembers?.map(user => (
                        <div>
                            <p>Name : {user?.name}</p>
                            <p>Phone : {user?.phone}</p>
                            <p>Email : {user?.email}</p>
                            <p>{formatJoinedAt(user?.joinedAt)}</p>
                        </div>
                    ))}
                </InnerText>
            </Modal>
        </Paper>)
}
export default GroupsDetails;