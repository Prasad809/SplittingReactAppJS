import React from "react";
import {
    Button,
    Container,
    Grid,
    FormControl,
    Link,
} from "@mui/material";
import { Form, Formik } from "formik";
import { initialValues, validation } from "./validationSchema";
import Textfield from "../../libs/TextField/Textfield"
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const payload = {
            "email": values.email,
            "name": values.fullName,
            "password": values.password,
            "phone": values.phone
        };
        dispatch(RegisterAction(payload)).then(res => {
            console.log(res);
        })
    }
    return (
        <Container maxWidth="xs">
            <h2>Sign Up</h2>
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={(values) => {
                handleSubmit(values);
            }}
            >
                {({ values, handleChange, handleBlur, touched, errors, }) => (
                    <Form >
                        <Grid size={12} spacing={2} rowSpacing={2}>
                            <label>FullName</label>
                            <FormControl fullWidth>
                                <Textfield
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.fullName && Boolean(errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                />
                            </FormControl>
                            <label>Email</label>
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
                            <label>Phone Number</label>
                            <FormControl fullWidth>
                                <Textfield
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
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
                                    fullWidth
                                    clr="contained"
                                    typ="submit"
                                    name={"Register"}
                                />
                                    
                                <span>Already has account ? </span><Link style={{ textDecoration: "none", cursor: "pointer" }} onClick={()=>navigate("/Login")}>sign In</Link>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default SignUp;