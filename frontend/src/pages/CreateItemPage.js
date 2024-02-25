import { useState } from "react";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { useGlobalState } from "../state/globalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateItemPage() {
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [file, setFile] = useState(null);
    let navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        const resp = await axios.post("http://127.0.0.1:5000/upload", formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem("token")
            }
        });

        axios
            .post("http://127.0.0.1:5000/item", {
                description,
                price,
                name,
                picture: resp.data.url
            }, {
                headers: {'Authorization': localStorage.getItem("token")}
            })
            .then((r) => {
                localStorage.setItem("token", r.data.token);

                navigate("/");
            })
            .catch((e) => {
                console.log(e)
                alert("Invalid input!");
            });
    };

    return (
        <Container className="my-5">
            <Row className="row d-flex justify-content-center">
                <Col md={4}>
                    <h3>New item</h3>
                </Col>
            </Row>
            <Row className="row d-flex justify-content-center">
                <Col md={4}>
                    <Form onSubmit={loginSubmit}>
                        <FormGroup className="form-group my-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="form-group my-3">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="form-group my-3">
                            <label>Price</label>
                            <input
                                type="number"
                                min={0}
                                step={0.01}
                                className="form-control"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="form-group my-3">
                            <label>Picture</label>
                            <input type="file" className="form-control-file form-control" onChange={(e) => setFile(e.target.files[0])}>
                            </input>
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

export default CreateItemPage;
