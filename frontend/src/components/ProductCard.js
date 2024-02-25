import { Image, Card, Button, Row, Col } from "react-bootstrap";

// https://i.ibb.co/L8Nrb7p/1.jpg

function ProductCard({imgSrc, itemTitle, itemPrice, itemUrl}) {
    return (
        <>
            <Col>
                <Card style={{ border: "none" }}>
                    <a
                        className="stretched-link text-decoration-none text-dark"
                        href={itemUrl}
                    >
                        <Card.Img
                            variant="top"
                            src={imgSrc}
                        />
                        <Card.Body>
                            <Card.Title>{itemTitle}</Card.Title>
                            <Card.Text>{`${itemPrice}$`}</Card.Text>
                        </Card.Body>
                    </a>
                </Card>
            </Col>
        </>
    );
}

export default ProductCard;
