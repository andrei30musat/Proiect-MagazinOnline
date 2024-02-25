import {
    Container,
    Row,
    Col,
    FormGroup,
    Form,
    Button,
    Card,
} from "react-bootstrap";

import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import OrderTable from "../components/OrderTable";

const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((res) => res.data);

function ProfilePage() {
    const { data, error } = useSWR("http://localhost:5000/status", fetcher);

    const [address, setAddress] = useState("");

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const addressSubmit = (e) => {
        e.preventDefault();

        axios
            .put(
                "http://127.0.0.1:5000/user",
                {
                    address,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((r) => {
                window.location.assign("/profile");
            })
            .catch((e) => {
                alert("Error updating address!");
            });
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <Card className={"mx-auto"}>
                        <Card.Body className={"text-center "}>
                            <Card.Text className={"mb-0"}>
                                <h3>{data.username}</h3>
                            </Card.Text>
                            <Card.Text className="text-muted">
                                {data.email}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                {data.address}
                            </Card.Text>
                            <Card.Text className="col-md-4 mx-auto">
                                <Form onSubmit={addressSubmit}>
                                    <FormGroup className="form-group my-3">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="AddressInput"
                                            name="AddressInput"
                                            placeholder="Enter new address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            className="btn btn-primary my-2"
                                        >
                                            Update
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className={"text-center"}>
                            {data.orders.length}{" "}
                            {data.orders.length == 1 ? "order" : "orders"}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mx-auto text-center my-4">
                    <h3>Orders</h3>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="mx-auto">
                    <OrderTable orders={data.orders} />
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;
