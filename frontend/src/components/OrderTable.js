import { Table } from "react-bootstrap";
import {Link} from "react-router-dom";


function OrderTable({ orders }) {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Adress</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {(orders.map(x => {
                        return (
                            <tr>
                                <td><Link to={`/order/${x._id}`}>{x._id}</Link></td>
                                <td>{x.createdAt}</td>
                                <td>{x.total}$</td>
                                <td>{x.address}</td>
                                <td>{x.status}</td>
                            </tr>
                        );
                    }))}
                </tbody>
            </Table>
        </>
    );
}

export default OrderTable;
