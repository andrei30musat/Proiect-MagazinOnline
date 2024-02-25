import {Container, Row, Col, Button} from "react-bootstrap";


import useSWR, {useSWRConfig} from "swr";
import axios from "axios";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router-dom";

const fetcher = (url) =>
    axios
        .post(url, {items: JSON.parse(localStorage.getItem("cart"))}, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },

        })
        .then((res) => res.data);

function CartPage() {
    const { data, error } = useSWR(`http://localhost:5000/order/preview`, fetcher);

    let navigate = useNavigate();
    

    const mutate = useSWRConfig();

    if (error) {
        return <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center">
                    <h3>Your cart is empty!</h3>
                </Col>
            </Row>
        </Container>
    }
    if (!data) return <div>loading...</div>;

    return (
    <>
        <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center">
                <h2>My cart</h2>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={8} className="mx-auto">
                    <ItemList order={data} updatable mutate={(q, idx) => {
                        navigate("/cart");
                    }}/>
                </Col>
            </Row>
            <Row className="text-center">
                    <Col md={6} className="" onClick={(e => {
                        localStorage.removeItem("cart");
                        navigate("/cart");
                    })}>
                        <Button variant="secondary">Clear</Button>
                    </Col>
                    <Col md={6} className="" onClick={async (e) => {
                        const response = await axios.post('http://localhost:5000/order', {items: JSON.parse(localStorage.getItem("cart"))}, {
                            headers: {
                                Authorization: localStorage.getItem("token"),
                            },
                        });

                        localStorage.removeItem("cart");

                        navigate(`/order/${response.data._id}`);


                    }}>
                        <Button>Order</Button>
                    </Col>
            </Row>
        </Container>
    </>);
}

export default CartPage;