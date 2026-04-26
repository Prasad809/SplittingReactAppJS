import { Box, Button, Divider, FormControl, Grid, MenuItem, Modal, Paper, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberAction, createGroupAction, groupListAction, memberListAction, userListAction } from "./Store/Action";
import { useNavigate } from "react-router-dom";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import Textfield from "../../libs/TextField/Textfield";
import InnerText from "@mui/material/Paper"
import { Form, Formik } from "formik";
import * as Yup from "yup"
import Dropdown from "../../libs/Dropdown/Dropdown";
import AlertMsg from "../../libs/SoftAlert/AlertBox";

const modalStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: 5,
    height: "50%",
    boaderRadius: "25px",
    padding: "10px"
};

const initialValues = {
    groupName: "",
    description: ""
};
const initiavls = {
    groupName: "",
    memberName: ""
};

const listValidation = Yup.object().shape({
    groupName: Yup.string().required("Group Name Should Not be left blank"),
    memberName: Yup.string().required("Select Member to add to this Group.")
})
const validationSchema = Yup.object().shape({
    groupName: Yup.string().required("Group Name Should Not be left blank"),
    description: Yup.string().required("Description Should Not be left blank")
})


function Group() {
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state?.authReducer);
    const userRefNum = authReducer?.user?.userRefNum;

    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [initialVals,setInitialVals] = useState(initiavls);
    const [selectedGroup,setSelectedGroup] = useState({});
    const [errStatus,setErrStatus] = useState("");
    const errClose = ()=>setErrStatus("");

    const [errAddStatus,setErrAddStatus] = useState("");
    const errAddClose = ()=>setErrAddStatus("");


    const handleOpenPopUp = () => {
        setOpen(true)
    };
    const handleClosePopUp = () => {
        setOpen(false)
    };
    const grouplist = () => {
        dispatch(groupListAction({ userId: userRefNum })).then((res) => {
            if (res?.payload?.data?.status) {
                setGroups(res?.payload?.data?.groups || []);
            }
        });
    };
    const usersList = () => {
        dispatch(userListAction()).then((res) => {
            if (res?.payload?.data?.status) {
                setUsers(res?.payload?.data?.users || []);
            }
        });
    };
    const [openList,setOpenList] = useState(false);
    const handleOpenListPopUp = (group) => {        
        setInitialVals({
            groupName:group.groupName,
            memberName:""
        });
        setSelectedGroup(group);
        setOpenList(true);
        dispatch(memberListAction({"groupId":group.groupId})).then(res =>{
            console.log(res);
            
        })
    };
    const handleCloseListPopUp = () => {
        setOpenList(false);
        setSelectedGroup({});
    };

    useEffect(() => {
        grouplist();
        usersList();
    }, [dispatch]);

    const handleCreateGroup = (values) => {
        const payload = {
            "groupName": values?.groupName,
            "description": values?.description,
            "createdBy": userRefNum
        }
        dispatch(createGroupAction(payload)).then(res => {
            if (res?.payload?.data?.status) {
                handleClosePopUp();
                grouplist();
                usersList();
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description);
            }
        })

    };
    const handleAddPersonToGroup = (values) => {
        const payload = {
            "groupId": selectedGroup?.groupId,
            "userId": userRefNum,
            "addedBy": values?.memberName
        }        
        dispatch(addMemberAction(payload)).then(res => {
            if (res?.payload?.data?.status) {
                handleCloseListPopUp();
                grouplist();
                usersList();
            } else {
                setErrAddStatus(res?.payload?.data?.message?.[0]?.description);
            }
        })
    };


    return (
        <Paper elevation={0}>
            <h2>Groups</h2>
            <h3>Create a Group
            <span class="material-symbols-outlined pointer" onClick={handleOpenPopUp}><Tooltip title={"Create Group"}>person</Tooltip></span>
            </h3>
            <Grid container spacing={2}>
                {groups?.map((group) => (
                    <Grid item xs={12} sm={6} md={4} key={group.groupId}>
                        <div className="group-card">
                            <div>
                                <h3 className="startEnd">Group Number : {group.groupId}
                                    <span className="material-symbols-outlined pointer" onClick={()=>handleOpenListPopUp(group)}><Tooltip title={"Add Member"}>add</Tooltip></span>
                                </h3>
                                <h3>Group Name : {group.groupName}</h3>
                                <p className="group-description">
                                    Group Description : {group?.description}
                                </p>
                                <p>Group Members : 10</p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Modal open={open} onClose={handleClosePopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <AlertMsg errStatus={errStatus} errClose={errClose} severity={"error"}/>
                    <h3 className="startEnd">
                        Create Group
                        <span className="material-symbols-outlined pointer" onClick={handleClosePopUp}>Close</span>
                    </h3>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleCreateGroup(values)} enableReinitialize={true}
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
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <label>Description</label>
                                        <FormControl fullWidth>
                                            <Textfield
                                                name={"description"}
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.description && Boolean(errors.description)}
                                                helperText={touched.description && errors.description}
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
            <Modal open={openList} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"}/>
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
                                                list={users?.map(user =>(
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
        </Paper>
    );
}

export default Group;