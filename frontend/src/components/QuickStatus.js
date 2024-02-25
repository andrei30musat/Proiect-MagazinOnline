import { Button, Image, Nav } from "react-bootstrap";
import {Cart, BoxArrowInLeft} from "react-bootstrap-icons";

import {useGlobalState} from "../state/globalState";
import { useNavigate } from "react-router-dom";


function NotLoggedIn() {
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    return (
    <>
        <Button variant="light" size="sm" onClick={(e) => navigateTo(e, "/login")}>Log in</Button>
    </>
    );
}

function LoggedIn() {
    const state = useGlobalState();

    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    return (
    <>
        <a href="" onClick={(e) => navigateTo(e, "/profile")} className="my-1 mx-2 link-light">{`Hello, ${state.username}`}</a>
        {state.role == "user" && <Button variant="outline-light" onClick={(e) => navigateTo(e, "/cart")}  size="sm" className="mx-2" style={{minWidth: "50px"}}><Cart/></Button>}
        <Button variant="light" size="sm" className="mx-2" style={{minWidth: "50px"}} onClick={(e) => {
            localStorage.removeItem("token");
            window.location.assign("/");
        }}><span>Log out <BoxArrowInLeft/> </span></Button>
    </>
    );
}

function QuickStatus() {
    const state = useGlobalState();
    

    return (
    <>
        {state.loggedIn ? <LoggedIn/> : <NotLoggedIn/>}
    </>
    );
}

export default QuickStatus;