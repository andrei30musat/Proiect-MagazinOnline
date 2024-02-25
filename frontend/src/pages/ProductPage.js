import {Container, Row, Col, FormGroup, Form, Button, Card, Image} from "react-bootstrap";
import {useParams} from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const fetcher = (url) =>
    axios
        .get(url)
        .then((res) => res.data);

function ProductPage() {
    const {id} = useParams();

    const { data, error } = useSWR(`http://localhost:5000/item/${id}`, fetcher);

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        if (!cart) {
            cart = [];
        }

        const itmIdx = cart.findIndex(x => x.id == productId)

        if (itmIdx == -1) {
            cart.push({
                id: productId,
                quantity: 1
            });

            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart[itmIdx].quantity += 1;

            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;


    return (
        <Container className="py-5">
            <Row>
                <Col md={6} className="mx-auto">
                    <Card className="mx-auto">
                        <Row className="no-gutters">
                            <Col sm={5}>
                                <Image fluid src={data.picture} />
                            </Col>
                            <Col sm={7}>
                                <Card.Body>
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Subtitle className="my-1 text-muted">{data.price}$</Card.Subtitle>
                                    <Card.Text className="my-1">{data.description}</Card.Text>
                                    <Button onClick={() => addToCart(id)} size="sm" className="my-2">Add to cart</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;