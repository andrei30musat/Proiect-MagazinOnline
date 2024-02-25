import React from "react";
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import QuickStatus from"./QuickStatus";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../state/globalState";


function Navigation() {
    const state = useGlobalState();

    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }
    
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="" onClick={(e) => navigateTo(e, "/")}>MyStore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="" onClick={(e) => navigateTo(e, "/")}>Home</Nav.Link>
                            {!state.loggedIn && <Nav.Link href="" onClick={(e) => navigateTo(e, "/register")}>Register</Nav.Link>}
                            {state.loggedIn && state.role =="admin" && <Nav.Link href="" onClick={(e) => navigateTo(e, "/orders")}>Orders</Nav.Link>}
                            {state.loggedIn && state.role =="admin" && <Nav.Link href="" onClick={(e) => navigateTo(e, "/newitem")}>Create item</Nav.Link>}
                        </Nav>
                        <Nav >
                    <QuickStatus/>
                    </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
