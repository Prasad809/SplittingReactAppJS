import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function CardInfo({ data }) {
    const headings = (obj) => {
        return Object.keys(obj);
    };

    return (
        <Grid container>
            {data?.map((item) => (
                <Grid key={item.id} size={4}>
                    <Card sx={{ marginBottom: 2, padding: '10px' }}>
                        <CardActionArea>
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.title || "Card image"}
                                />
                            )}
                            <CardContent>
                                {headings(item).map((key) => {
                                    if (key === 'image') return null;

                                    const value = item[key];

                                    const renderValue = (val) => {
                                        if (Array.isArray(val)) {
                                            return (
                                                <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                                                    {val.map((elem, idx) => (
                                                        <li key={idx}>
                                                            {typeof elem === 'object' && elem !== null ? (
                                                                <ul style={{ paddingLeft: "1em" }}>
                                                                    {Object.entries(elem).map(([k, v]) => (
                                                                        <li key={k}>
                                                                            <strong>{k}:</strong> {String(v)}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                String(elem)
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        } else if (typeof val === 'object' && val !== null) {
                                            return (
                                                <ul style={{ paddingLeft: "1em" }}>
                                                    {Object.entries(val).map(([k, v]) => (
                                                        <li key={k}>
                                                            <strong>{k}:</strong> {String(v)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        } else {
                                            return String(val);
                                        }
                                    };

                                    return (
                                        <Typography key={key} variant="body2" color="text.secondary" component="div">
                                            <strong>{key}:</strong> {renderValue(value)}
                                        </Typography>
                                    );
                                })}
                            </CardContent>

                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardInfo;
