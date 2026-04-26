import { Grid, Modal, TextField, Box, Button, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Otp({open,close,count,setCount,otp,setOtp,handleSaveOtp}) {

  const modalStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 280, sm: 420 },
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };
  const inputRefs = useRef([]);

  const handleOnchangeOtp = (e, index) => {
    const { name, value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;
    setOtp({ ...otp, [name]: value })
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };




  useEffect(() => {
    if (!open) return;
    const timeOut = setTimeout(() => {
      close()
    }, 30000);

    const countTime = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
      clearInterval(countTime);
    };
  }, [open]);
  const [color, setColor] = useState('')
  useEffect(() => {
    if (count <= 5) {
      setColor('red')
    } else if (count <= 10) {
      setColor('orange')
    } else {
      setColor('grey')
    }
  }, [count])

  const clearOtp = () => {
    setOtp({})
    if (inputRefs?.current) {
      inputRefs.current.forEach(input => {
        if (input) input.value = '';
      });
    }

  }
  return (
    <>
      <Modal
        open={open}
        onClose={close}
      >
        <Box sx={modalStyle}>
          <h4>One Time Password</h4>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            rowGap={2}
          >
            {[...Array(4)].map((_, index) => (
              <Grid  key={index}>
                <TextField
                  inputProps={{
                    maxLength: 1,
                    style: {
                      width: '1rem',
                      height: '1rem',
                      fontSize: '1.5rem',
                      textAlign: 'center',
                    },
                  }}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleOnchangeOtp(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  name={`otp${index + 1}`}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Button onClick={handleSaveOtp} variant="contained">Submit</Button>
            <Button onClick={clearOtp} variant="outlined">Clear</Button>
          </Stack>
          <Box sx={{ mt: 3 }}>
            <h6 style={{ color: color }}>OTP will expire in {count} seconds...!</h6>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Otp;