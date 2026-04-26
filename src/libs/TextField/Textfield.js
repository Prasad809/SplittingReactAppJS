import * as React from 'react';
import TextField from '@mui/material/TextField';

const style = {
  width: '100%',
  '& .MuiInputBase-root': {
      borderRadius: '4px',
      height: '45px',
  },
};

export default function Textfield({plh,value,...props}) {
  return (
      <TextField fullWidth placeholder={plh} {...props} sx={style} value={value !== undefined && value !== null ? value : ''}/>
  );
}
