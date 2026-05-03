import { Grid, Card, CardContent, Typography } from "@mui/material";

function UserCard({ user }) {
    return (
        <Grid item xs={12} sm={6}>
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
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {user?.userName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        📞 {user?.userPhone}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        📧 {user?.userEmail}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default UserCard;