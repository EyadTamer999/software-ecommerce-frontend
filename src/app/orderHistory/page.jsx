"use client";
import { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsbGFoLmFib29vZkBnbWFpbC5jb20iLCJ1c2VyIjoiNjY0NWZhZTZkMzE2MzAzZjhhNGE1Y2YzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2Mzk4NjgxLCJleHAiOjE3MTY0MDIyODF9.T-yIHHdTKH3rKdI7fWqj20GD0rwXkUgWtFQ3_hbvXL0`; // Replace with the actual token

            try {
                const response = await fetch(`http://localhost:3001/order-gateway/get-orders-history`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                //console.log("response: ", response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("data: ", data);
                setOrders(data.orders);
                setMessage(data.message);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <div className="overflow-x-auto p-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>OrderID</th>
                            <th>paymentStatus</th>
                            <th>orderStatus</th>
                            <th>createdAt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.createdAt}</td>
                                <td>
                                    <button
                                        onClick={() => handleViewOrder(order)}
                                        className="btn btn-info"
                                    >
                                        View Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Order Details</h3>
                        {selectedOrder ? (
                            <div>
                                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                                <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                                <p><strong>Created At:</strong> {selectedOrder.createdAt}</p>
                                <p><strong>Created At:</strong> {selectedOrder.deliveryStatus}</p>
                                <p><strong>Created At:</strong> {selectedOrder.couponCode}</p>
                                <p><strong>Created At:</strong> {selectedOrder.totalAmount}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
