import { Table, FormGroup } from "react-bootstrap";

function ItemList({ order, updatable, mutate }) {
    return (
        <>
            <Table striped bordered hover responsive    >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {(order.items.map((x, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{x.item.name}</td>
                                {updatable ? <td><FormGroup><input type="number" defaultValue={x.quantity} min={0} onChange={(e) => {
                                    const cart = JSON.parse(localStorage.getItem('cart'));

                                    const itemIdx = cart.findIndex(y => y.id == x.item._id);

                                    if (itemIdx == -1) {
                                        return;
                                    }

                                    cart[itemIdx].quantity = e.target.value;

                                    const strCart = JSON.stringify(cart);

                                    localStorage.setItem('cart', strCart);

                                    mutate(e.target.value, itemIdx);
                                }}></input></FormGroup></td> : <td>{x.quantity}</td>}
                                <td>{x.item.price}$</td>
                                <td>{x.quantity * x.item.price}$</td>
                            </tr>
                        );
                    }))}
                    <tr>
                        <td><span><b>TOTAL: {order.total}$</b></span></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default ItemList;
