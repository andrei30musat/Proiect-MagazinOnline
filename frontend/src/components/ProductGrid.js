import { Container, Row, Col, FormControl } from "react-bootstrap";
import ProductCard from "./ProductCard";
import useSWR from 'swr';
import axios from 'axios';
import {useState} from "react";

const fetcher = url => axios.get(url).then(res => res.data)

function ProductGrid() {
    const { data, error } = useSWR('http://localhost:5000/items', fetcher);
    const [search, setSearch] = useState("");


    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const filteredData = data.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));


    return (
        <>
            <Container className="my-5">
                <Row className="my-5">
                    <Col md={3}>
                        <h3>Welcome to MyStore!</h3>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row xs={1} md={4} className="g-4">
                    {filteredData.map((itm, idx) => (
                        <ProductCard key={itm._id} imgSrc={itm.picture} itemTitle={itm.name} itemPrice={itm.price} itemUrl={`/item/${itm._id}`}/>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductGrid;
