import { Box, Button, Divider, FormControl, Grid, MenuItem, Modal, Paper, Tooltip,Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenesAction, addMemberAction,requestMemberAction, groupListAction, memberListAction, TransGrouptAction, userListAction } from "./Store/Action";
import { useNavigate } from "react-router-dom";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import Textfield from "../../libs/TextField/Textfield";
import InnerText from "@mui/material/Paper"
import { Form, Formik } from "formik";
import * as Yup from "yup"
import Dropdown from "../../libs/Dropdown/Dropdown";
import AlertMsg from "../../libs/SoftAlert/AlertBox";
import token from "../../Common/token";
import Slider from "../../libs/Slider/Slider";
import ExpenseGroup from "./ExpenseGroup";
import Messages from "./Messages";

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
    width: "40%",
    borderRadius: 5,
    height: "70%",
    boaderRadius: "25px",
    padding: "10px",
    overflowY:"auto"
};

const initiavls = {
    groupName: "",
    memberName: ""
};
const addExpenesVals = {
    amount: "",
    description: ""
};

const listValidation = Yup.object().shape({
    groupName: Yup.string().required("Group Name Should Not be left blank"),
    memberName: Yup.string().required("Select Member to add to this Group.")
})
const expensesValidation = Yup.object().shape({
    amount: Yup.string().required("Add Expense Amount.It should not be left blank"),
    description: Yup.string().required("Description Should not be left blank.")
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
    const [openList, setOpenList] = useState(false);
    const [viewMembers, setViewMembers] = useState([]);
    const [viewPopUp, setViewPopUp] = useState(false);

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
    const navigate = useNavigate();
    const backToGroup=()=>{
        navigate("/Group")
    };
    const [openSlider,setOpenSlider] = useState(false);
    const [transData,setTransData] = useState({});

    const handleOpenSlider=(row)=>{
        setOpenSlider(true);
        setSelectedGroup(row);
        dispatch(TransGrouptAction({groupId:row?.groupId})).then(res =>{
            if(res?.payload?.data?.status){
                setTransData(res?.payload?.data?.data)
            }
        })
    };

    const [addExpenes,setAddExpenes] = useState([]);
    const [addExpnOpen,setAddExpnOpen] = useState(false);
    const handleOpenExpenes=(group)=>{
        setAddExpnOpen(true);
        setSelectedGroup(group);
    };
    const handleCloseExpenes=()=>{
        setAddExpnOpen(false);
        setSelectedGroup({});
    };
    const handleSubmitExpenes=(values)=>{
        const payload={
            "groupId":selectedGroup?.groupId,
            "paidBy":userRefNum,
            "amount":values?.amount,
            "description":values?.description
        };
        dispatch(addExpenesAction(payload)).then(res =>{
            if(res?.payload?.data?.status){
                handleCloseExpenes()
            }else{
                
            }
        })
    };

    const [requestMem, setRequestMem] = useState([]);
    const handleMessage=()=>{
        dispatch(requestMemberAction({ "groupId": group?.groupId })).then(res => {
            if (res?.payload?.data?.status) {
                setRequestMem(res?.payload?.data?.requests)
            }
        });
    }
    useEffect(() => {
        handleMessage();
    }, [])
    const [messgOpen, setMessgOpen] = useState(false)
    const handleMessageSlider = () => {
        setMessgOpen(true)
    }
    const handleMessageCloseSlider = () => {
        setMessgOpen(false);
        handleMessage();
    }


    return (
        <Paper elevation={0}>
            <Grid>
                <ButtonThemes name={"Back"} clr={"contained"} funcname={backToGroup}/>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            transition: "0.3s",
                            "&:hover": {
                                borderColor: "#1976d2",
                                boxShadow: 4,
                            },
                        }}
                    >
                        <CardContent sx={{ height: "300px" }}>
                            <h3 className="startEnd">Group Number : {group.groupId}
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenListPopUp(group, "view")}><Tooltip title={"View Group Members"}>family_group</Tooltip></span>
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenListPopUp(group, "add")}><Tooltip title={"Add Member"}>person_add</Tooltip></span>
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenSlider(group)}><Tooltip title={"Group Transctions"}>receipt</Tooltip></span>
                                <span className="material-symbols-outlined pointer" onClick={() => handleOpenExpenes(group)}><Tooltip title={"Add Expenses"}>note</Tooltip></span>
                            </h3>
                            <h3>Group Name : {group.groupName}</h3>
                            <p className="group-description">
                                Group Description : {group?.description}
                            </p>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid>
                <span className="material-symbols-outlined" onClick={handleMessageSlider}>message<sup>{requestMem?.length}</sup></span>
            </Grid>
            <Modal open={openList} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"} />
                    <h3 className="startEnd">
                        Add Member to this Group
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
            <Modal open={addExpnOpen} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"} />
                    <h3 className="startEnd">
                        Add Expenes to this Group
                        <span className="material-symbols-outlined pointer" onClick={handleCloseExpenes}>Close</span>
                    </h3>
                    <Formik initialValues={addExpenesVals} validationSchema={expensesValidation} onSubmit={(values) => handleSubmitExpenes(values)} enableReinitialize={true}
                    >
                        {({ values, handleChange, handleBlur, touched, errors }) => (
                            <Form >
                                <Grid size={12} spacing={2} rowSpacing={2}>
                                    <Grid size={6}>
                                        <label>Expense Amount</label>
                                        <FormControl fullWidth>
                                            <Textfield
                                                name={"amount"}
                                                value={values.amount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.amount && Boolean(errors.amount)}
                                                helperText={touched.amount && errors.amount}
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
            <Modal open={viewPopUp} onClose={handleCloseListPopUp}>
                <InnerText elevation={0} style={modalStyle2}>
                    <AlertMsg errStatus={errAddStatus} errClose={errAddClose} severity={"error"} />
                    <h3 className="startEnd">
                        Group Members
                        <span className="material-symbols-outlined pointer" onClick={handleCloseListPopUp}>Close</span>
                    </h3>
                    <Grid container spacing={2}>
                        {viewMembers?.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user.id}>
                                <Card
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 2,
                                        height: "100%",
                                    }}
                                >
                                    <CardContent>
                                        <p><strong>Name:</strong> {user?.name}</p>
                                        <p><strong>Phone:</strong> {user?.phone}</p>
                                        <p><strong>Email:</strong> {user?.email}</p>
                                        <p>{formatJoinedAt(user?.joinedAt)}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </InnerText>
            </Modal>
            <Slider show={openSlider} onClose={()=>setOpenSlider(false)} component={<ExpenseGroup transData={transData} selectedGroup={selectedGroup}/>} />
            <Slider show={messgOpen} onClose={handleMessageCloseSlider} component={<Messages requestData={requestMem} groupId={group?.groupId} close={handleMessageCloseSlider}/>} />
        </Paper>)
}
export default GroupsDetails;