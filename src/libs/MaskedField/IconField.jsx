import { InputAdornment, TextField } from "@mui/material";
const textFieldStyles = {
    width: '100%',
    '& .MuiInputBase-root': {
        borderRadius: '5px',
        height: '40px',
    },
};
function IconField({IconName,...props}){
    return(
        <TextField {...props}
        InputProps={{
        startAdornment: (
            <InputAdornment position="start">
               <IconName />
            </InputAdornment>
        ),
    }}
    sx={textFieldStyles}
        />
    )
}
export default IconField;