"use client";
import { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

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
                console.log("response: " , response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                setOrders(data.orders);
                setMessage(data.message);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
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
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.paymentStatus}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.createdAt}</td>
                        <td>
                        <button 
                            onClick={() => handleViewOrder(order._id)} 
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
    );
};

export default OrderHistory;

