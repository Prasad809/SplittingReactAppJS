import { Box, Button, Card, CardContent, Divider, FormControl, Grid, MenuItem, Modal, Paper, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupAction, groupListAction } from "./Store/Action";
import { useNavigate } from "react-router-dom";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import Textfield from "../../libs/TextField/Textfield";
import InnerText from "@mui/material/Paper"
import { Form, Formik } from "formik";
import * as Yup from "yup"
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

const initialValues = {
    groupName: "",
    description: ""
};

const validationSchema = Yup.object().shape({
    groupName: Yup.string().required("Group Name Should Not be left blank"),
    description: Yup.string().required("Description Should Not be left blank")
})


function Group() {
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state?.authReducer);
    const userRefNum = authReducer?.user?.userRefNum;
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const [errStatus,setErrStatus] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const errClose = ()=>setErrStatus("");  

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

    useEffect(() => {
        grouplist();
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
            } else {
                setErrStatus(res?.payload?.data?.message?.[0]?.description);
            }
        })

    };

    const handleSelectGroup = (group) => {
        setSelectedGroupId(group.groupId);
        token.setGroupDtls(group);
        setDisabled(false);
    };

    const handleSubmitGroup=()=>{
        navigate("/GroupsDetails");
    };

    return (
        <Paper elevation={0}>
            <h2>Groups</h2>
            <h3>Create a Group
            <span class="material-symbols-outlined pointer" onClick={handleOpenPopUp}><Tooltip title={"Create Group"}>group_add</Tooltip></span>
            </h3>
                <ButtonThemes name={"Next"} funcname={handleSubmitGroup} clr={disabled ? "outlined" :"contained"} disabled={disabled}/>
            <Grid container spacing={2}>
                {groups?.map((group) => (
                    <Grid item xs={12} sm={6} md={4} key={group.groupId}>
                        <Card
                            className={`group-card ${selectedGroupId === group.groupId ? "selected" : ""
                                }`}
                            onClick={() => handleSelectGroup(group)}
                        >
                            <CardContent>
                                <h3 className="startEnd">
                                    Group Number : {group.groupId}
                                </h3>
                                <h3>Group Name : {group.groupName}</h3>
                                <p className="group-description">
                                    Group Description : {group?.description}
                                </p>
                            </CardContent>
                        </Card>
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
        </Paper>
    );
}

export default Group;