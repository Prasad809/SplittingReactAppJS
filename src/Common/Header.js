import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Tooltip } from "@mui/material";
import "./common.css";

function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className="header">

                {/* LEFT ICONS */}
                <div className="nav-left">
                    <Tooltip title="Home">
                        <span className="material-symbols-outlined nav-icon">home</span>
                    </Tooltip>

                    <Tooltip title="Groups">
                        <span className="material-symbols-outlined nav-icon">group</span>
                    </Tooltip>

                    <Tooltip title="Wallet">
                        <span className="material-symbols-outlined nav-icon">account_balance_wallet</span>
                    </Tooltip>
                </div>

                {/* RIGHT MENU */}
                <div className="nav-right" ref={menuRef}>
                    <Tooltip title="Menu">
                        <span
                            className="material-symbols-outlined menu-icon"
                            onClick={() => setOpen(!open)}
                        >
                            list
                        </span>
                    </Tooltip>

                    {open && (
                        <div className="dropdown-menu">
                            <div className="menu-item" onClick={() => setOpen(false)}>
                                👤 Profile
                            </div>
                            <div className="menu-item" onClick={() => setOpen(false)}>
                                🎨 Color Theme
                            </div>
                            <div className="menu-item logout" onClick={() => setOpen(false)}>
                                🚪 Logout
                            </div>
                        </div>
                    )}
                </div>

            </Container>
        </Navbar>
    );
}

export default Header;