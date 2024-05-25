'use client';
import { HeartIcon, PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token'); // Replace with your actual bearer token
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleAddPromoCode = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/order-gateway/add-promo-code', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ code, discount, expiryDate })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            alert('Promo code added successfully');
            // Reset form fields
            setCode('');
            setDiscount('');
            setExpiryDate('');
            // Close the modal
            document.getElementById('my_modal_3').close();
        } catch (error) {
            console.error('Error adding the promo code:', error);
        }
    };

    return (
        <>
            <button onClick={toggleSidebar} className="">
                {isSidebarVisible ? 'Hide' : 'Show'}
            </button>
            {
                isSidebarVisible && (
                    <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-base-200 p-2.5 shadow-lg backdrop-blur-lg fixed top-2/4 -translate-y-2/4 lg:left-6 md:left-4 left-0 min-h-[auto] min-w-[64px] flex-col rounded-lg border md:scale-100 lg:scale-100 scale-75">

                        {/* Profile */}
                        <a
                            href="#profile"
                            className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-primary hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            <small className="text-center text-xs font-medium">Profile</small>
                        </a>
                        <hr />

                        {/* Orders */}
                        <a
                            href="/orderHistory"
                            className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <small className="text-xs font-medium">Orders</small>
                        </a>
                        <hr />

                        {/* Payment Methods */}
                        <a

                            href="/payment"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"

                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                            </svg>
                            <small className="text-xs font-medium">Payment</small>
                        </a>

                        {/* Favorites Methods */}
                        <a

                            href="/favorites"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"

                        >
                            <HeartIcon className="w-6 h-6" />

                            <small className="text-xs font-medium">favorites</small>
                        </a>

                        {/* My Reviews */}
                        <a
                            href="/myReviews"
                            className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            <StarIcon className="w-6 h-6" />
                            <small className="text-xs font-medium">Reviews</small>
                        </a>




                        {/* My Assigned Orders (Only for Admin) */}
                        {userRole === 'admin' && (
                            <>
                                <hr />
                                <a
                                    href="/assignedOrdersAdmin"
                                    className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    <small className="text-xs font-medium">Assigned Orders</small>
                                </a>
                                <a
                                    href="/DeliveryFees"
                                    className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    <small className="text-xs font-medium">Add Delivery Regions</small>
                                </a>
                                <button
                                    className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                                    onClick={() => document.getElementById('my_modal_3').showModal()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    <small className="text-xs font-medium">Add Promo Code</small>
                                </button>
                            </>
                        )}



                    </nav>
                )
            }

            {/* Modal for adding promo code */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleAddPromoCode}>
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <h3 className="font-bold text-lg">Add Promo Code</h3>
                        <div className="py-4">
                            <label className="block">
                                <span className="text-gray-700">Code</span>
                                <input
                                    type="text"
                                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="block mt-4">
                                <span className="text-gray-700">Discount</span>
                                <input
                                    type="number"
                                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="block mt-4">
                                <span className="text-gray-700">Expiry Date</span>
                                <input
                                    type="date"
                                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Promo Code</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default Sidebar;
