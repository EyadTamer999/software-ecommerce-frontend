'use client';
import React, { useEffect, useState } from 'react';

const DeliveryFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const token = localStorage.getItem('token'); // Replace with your actual bearer token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/order-gateway/Get-all-Delivery-Fees', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFees(data.deliveryFees);
      } catch (error) {
        console.error('Error fetching the delivery fees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/order-gateway/delete-delery-fee/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the deleted fee from the state
      setFees(fees.filter(fee => fee._id !== id));
      alert('Delivery fee removed successfully');
    } catch (error) {
      console.error('Error deleting the delivery fee:', error);
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/order-gateway/add-delivery-fee', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ city, deliveryFees: deliveryFee })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Update the state with the new fee
      setFees([...fees, data.NewdeliveryFee]);
      setCity('');
      setDeliveryFee('');
      alert('Delivery fee added successfully');
    } catch (error) {
      console.error('Error adding the delivery fee:', error);
    }
  };

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="card shadow-lg w-full max-w-4xl bg-white rounded-lg">
        <div className="overflow-x-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : (
            <>
              <table className="table-auto w-full mx-auto border-collapse rounded-lg overflow-hidden">
                {/* head */}
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">City</th>
                    <th className="py-2 px-4 border-b">Delivery Fee</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={fee._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{fee.city}</td>
                      <td className="py-2 px-4 border-b">${fee.deliveryFees}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          onClick={() => handleDelete(fee._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form onSubmit={handleAdd} className="mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mb-2 sm:mb-0 p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Delivery Fee"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    className="mb-2 sm:mb-0 p-2 border border-gray-300 rounded-md"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryFees;
