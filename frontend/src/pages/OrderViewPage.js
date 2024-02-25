import {Container, Row, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";


import useSWR from "swr";
import axios from "axios";
import ItemList from "../components/ItemList";

const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((res) => res.data);

function OrderViewPage() {
    const {id} = useParams();

    const { data, error } = useSWR(`http://localhost:5000/order/${id}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Col className="mx-auto text-center">
                        <h2>Order {data._id}</h2>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={8} className="mx-auto">
                    <ItemList order={data}/>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderViewPage;