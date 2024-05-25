"use client";
import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:3001/order-gateway/get-orders-history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //check if Unauthorized redirect to home
        if (response.status === 401) {
          window.location.href = "/";
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data: ", data);

        const sortedOrders = data.orders.sort((a, b) => {
          const statusOrder = ["open", "pending"];
          const statusA = statusOrder.indexOf(a.orderStatus.toLowerCase());
          const statusB = statusOrder.indexOf(b.orderStatus.toLowerCase());

          if (statusA === -1 && statusB === -1) return 0;
          if (statusA === -1) return 1;
          if (statusB === -1) return -1;
          return statusA - statusB;
        });

        setOrders(sortedOrders);
        setMessage(data.message);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setIsLoading(false);
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

  const handleCancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    console.log("roleeeeee: ", localStorage.getItem("role"));

    try {
      const response = await fetch(
        `http://localhost:3001/order-gateway/cancel-order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("data: ", data);
      if (data.message === "You can not cancel the order now 2 days passed") {
        alert("You can not cancel the order 2 days passed");
        return;
      }

      // Update the order status in the local state
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "cancelled" } : order
      );
      setOrders(updatedOrders);
      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-dots loading-md"></span>
        </div>
      ) : (
        <div className="overflow-x-auto p-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>OrderID</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Created At</th>
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
                    {order.orderStatus.toLowerCase() === "open" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-danger ml-2"
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <h3 className="font-bold text-xl mb-4">Order Details</h3>
            {selectedOrder ? (
              <div className="space-y-2">
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
                </p>
                <p>
                  <strong>Order Status:</strong> {selectedOrder.orderStatus}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Date:</strong>{" "}
                  {new Date(selectedOrder.deliveryDate).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Status:</strong>{" "}
                  {selectedOrder.deliveryStatus}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${selectedOrder.totalPrice}
                </p>
                <p>
                  <strong>Shipping Address:</strong>{" "}
                  {`${selectedOrder.shippingAddress.label}, ${selectedOrder.shippingAddress.appartment}, ${selectedOrder.shippingAddress.floor}, ${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.building}, ${selectedOrder.shippingAddress.postalcode}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.country}, ${selectedOrder.shippingAddress.state}`}
                </p>
                <div>
                  <strong>Order Items:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {selectedOrder.orderItems.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - {item.color} - {item.size} - ${item.price}{" "}
                        x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="modal-action mt-4">
              <button onClick={closeModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
