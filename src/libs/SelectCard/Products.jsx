import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import token from "../common/token";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { selectedCourseAction } from "../pages/Coursers/store/Action";
import AlertMsg from "./AlertBox";

function Products({ data }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = token?.getUserBasic().userName
    const [errMsg, setErrMsg] = useState('')
    const errClose = (str) => setErrMsg('')

    const handleSelectCard = (id) => {
        const selectedCard = data?.find((card) => card.id === id)
        // token.setSeletedCard(selectedCard)
        // navigate('/payment')
        const payload = {
            emailOrUserName: userDetails,
            name: selectedCard.name,
            fee: selectedCard.fee,
            period: selectedCard.period,
            description: selectedCard.description,
            classes: selectedCard.classes,
            hours: selectedCard.hours
        }
        dispatch(selectedCourseAction(payload)).then(res => {
            if (res?.payload?.data?.status) {
                setErrMsg(res?.payload?.data?.description)
            }
        })
    }

    return (
        <Grid container>
            {errMsg && <AlertMsg severity={'success'} errStatus={errMsg} errClose={errClose} />}
            <Grid container spacing={3} sx={{ padding: '2rem' }}>
                {data?.map((item, index) => (
                    <Grid size={4} key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                                    transform: 'translateY(-5px)',
                                },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: '1rem',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {item?.name}
                                </Typography>

                                <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                                    {item?.description || 'No description provided.'}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Duration:</strong> {item?.period}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Classes:</strong> {item?.classes}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Hours:</strong> {item?.hours} hrs
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    <strong>Fee:</strong> ₹{item?.fee}/-
                                </Typography>

                                <Button variant="contained" color="primary" fullWidth onClick={() => handleSelectCard(item?.id)}>
                                    SELECTED
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default Products;