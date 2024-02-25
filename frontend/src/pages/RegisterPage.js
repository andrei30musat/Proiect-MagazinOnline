import {useState} from "react";
import {Container, Row, Col, FormGroup, Form, Button} from "react-bootstrap";
import {useGlobalState} from "../state/globalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const state = useGlobalState();
  let navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:5000/signup", {
      email,
      password,
      username
    }).then((r) => { 
        localStorage.setItem("token", r.data.token);


        window.location.assign("/");
    }).catch((e) => {
      alert("Invalid email or password!");
    })

    
  };

  return (
      <Container className="my-5">
        <Row className="row d-flex justify-content-center">
          <Col md={4}>
          <h3>Login</h3>
          </Col>
        </Row>
        <Row className="row d-flex justify-content-center">
          <Col md={4}>
            <Form onSubmit={loginSubmit}>
            <FormGroup className="form-group my-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="UsernameInput"
                  name="UsernameInput"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  
                />
              </FormGroup>
              <FormGroup className="form-group my-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </FormGroup>
              <FormGroup className="form-group my-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
              </FormGroup>
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
}

export default RegisterPage;