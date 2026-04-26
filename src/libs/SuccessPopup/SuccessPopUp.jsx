import { Box, Button, Modal } from "@mui/material";

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

function Success({ open, close, type,successBtn }) {
    return (
        <Modal open={open} onClose={close}>
            <Box sx={modalStyle}>
                {type === "success" ? <Box sx={{ color: 'green', mb: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48 }}>
                        task_alt
                    </span>
                </Box> :
                    <Box sx={{ color: 'red', mb: 2 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 48 }}>error</span>
                    </Box>
                }
                <h5>{type === "success" ? "Success" : "Failure"} </h5>
                {type === "success" ? <Button variant="contained" onClick={successBtn}>OK</Button> :
                <Button variant="contained" onClick={close}>OK</Button>}
            </Box>
        </Modal>
    );
}

export default Success;