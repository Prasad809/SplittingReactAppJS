import * as React from 'react';
import Select from '@mui/material/Select';
import { FormControl, MenuItem } from '@mui/material';

export default function Dropdown({
  list,
  name,
  value,
  inputProps,
  onChange,
  helperText,
  error,
  onBlur,
  touched,
  plh,
  ...props
}) {
  const selectStyles = {
    borderRadius: '4px',
    height: '40px',
    backgroundColor: 'white',
  };

  const errorTextStyles = {
    color: '#d32f2f',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '4px',
    marginRight: '14px',
    marginLeft: '14px',
    marginBottom: '0',
  };

  return (
    <FormControl fullWidth>
      <Select
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        inputProps={inputProps}
        {...props}
        sx={{
          ...selectStyles,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#d32f2f' : undefined,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
        }}
      >
        <MenuItem value="" disabled>
          {plh || 'Select'}
        </MenuItem>
        {list}
      </Select>
      {error && <p style={errorTextStyles}>{helperText}</p>}
    </FormControl>
  );
}
