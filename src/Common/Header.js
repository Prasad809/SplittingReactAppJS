import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { TextField, Tooltip } from "@mui/material"

function Header() {
    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="header d-flex align-items-center">
                    <Navbar.Brand><span class="material-symbols-outlined"><Tooltip title={"home"}>home</Tooltip></span></Navbar.Brand>
                    <Navbar.Brand><span class="material-symbols-outlined"><Tooltip title={"groups"}>group</Tooltip></span></Navbar.Brand>
                    <Navbar.Brand><span class="material-symbols-outlined"><Tooltip title={"wallets"}>wallet</Tooltip></span></Navbar.Brand>
                    <Navbar.Collapse className='listEnd'>
                        <span class="material-symbols-outlined">list</span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}
export default Header;