import { Box, Grid, Modal } from "@mui/material"
import { useState } from "react";
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

function ClockIn() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Box sx={modalStyle}>
                <h4>CLOCK IN</h4>
            </Box>
        </Modal>
    )
}
export default ClockIn;