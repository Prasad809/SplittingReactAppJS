import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function Globaldatepicker({
  value,
  onChange,
  name,
  slotTextFieldProps = {},
  ...props
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            name,
            size: "small",
            fullWidth: true,
            sx: {
              '& .MuiInputBase-root': {
                borderRadius: '4px',
                height: '40px',
              },
            },
            ...slotTextFieldProps,
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default Globaldatepicker;
