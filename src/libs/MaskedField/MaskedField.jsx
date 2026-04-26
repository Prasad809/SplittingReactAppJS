import { TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
const textFieldStyles = {
    width: '100%',
    '& .MuiInputBase-root': {
        borderRadius: '8px',
        height: '40px',
    },
};
function MaskedField({ value, maskLength = 8, isInitiallyMasked = false, onChange, maskPattern = "XXX-XXX-XXX-", ...props }) {
    const [originalPh, setOriginalPh] = useState(value);
    const [isMasked, setIsMasked] = useState(isInitiallyMasked);
    const [disable, setDisable] = useState(true);

    const maskValue = (value) => {
        if (value.length <= maskLength) return maskPattern;
        return maskPattern + value.slice(maskLength);
    };
    const displayValue = isMasked ? maskValue(originalPh) : originalPh;

    const handleChange = (e) => {
        const newValue = e.target.value;
            setOriginalPh(newValue);
            if (onChange) {
                onChange(e);
            }
        if (newValue?.length <= 5) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    };
    const handleMaskToggle = () => {
        setIsMasked(!isMasked);
    };

    return (
        <TextField
            {...props}
            onChange={handleChange}
            value={displayValue}
            inputProps={{ maxLength: 12 }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: 'pointer' }} disablePointerEvents={disable}>
                        {isMasked ? (
                            <VisibilityOffIcon onClick={handleMaskToggle} />
                        ) : (
                            <VisibilityIcon onClick={handleMaskToggle} />
                        )}
                    </InputAdornment>
                ),
            }}
            sx={textFieldStyles}
            disabled={isMasked}
        />
    );
}

export default MaskedField;