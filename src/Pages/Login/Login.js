import { Container, FormControl, Grid,Link } from "@mui/material"
import Textfield from "../../libs/TextField/Textfield"
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes"
import { Formik,Form } from "formik"
import { signInVals, signValidation } from "./validationSchema"
import { useNavigate } from "react-router-dom"
import { authAction } from "./Store/Action"
import { useDispatch } from "react-redux"
import { useState } from "react"
import AlertMsg from "../../libs/SoftAlert/AlertBox"

function Login({setNxt}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errStatus,setErrStatus] = useState("");
    const errClose = ()=>setErrStatus("");
    const handleSubmit=(values)=>{
        const isPhone = (value) => /^[0-9]{10}$/.test(value);
        const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const value = values.email;
        const payload = {
            password: values.password,
            ...(isPhone(value)
                ? { phone: value }
                : { email: value })
        };
        dispatch(authAction(payload)).then(res =>{
            if(res?.payload?.data?.status){
                navigate("/Dashboard");
                setNxt("1");
            }else{
                setErrStatus(res?.payload?.data?.message?.[0]?.description);
            }
        });  
    };

    return (
               <Container maxWidth="xs">
                <AlertMsg errClose={errClose} errStatus={errStatus} severity={"error"}/>
                <h2>Sign In</h2>
                <Formik initialValues={signInVals} validationSchema={signValidation} onSubmit={(values)=>handleSubmit(values)} enableReinitialize={true}
                >
                    {({values,handleChange,handleBlur,touched,errors}) => (
                        <Form >
                            <Grid size={12} spacing={2} rowSpacing={2}>
                                <label>Email/Phone</label>
                                <FormControl fullWidth>
                                    <Textfield
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </FormControl>
                                <label>Password</label>
                                <FormControl fullWidth>
                                    <Textfield
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </FormControl>
                                <Grid style={{marginTop:"10px"}}>
                                <ButtonThemes
                                    typ={"submit"}
                                    clr={"contained"}
                                    name={"Submit"}
                                    />
                                </Grid>
                                <span>create an account ? </span><Link style={{textDecoration:"none",cursor:"pointer"}}onClick={()=>navigate("/")}>sign Up</Link>
                            </Grid>
                        </Form>
                    )}
                </Formik>
        </Container>
    )
}

export default Login;