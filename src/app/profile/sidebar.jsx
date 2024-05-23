"use client";
import React, { useState } from 'react'

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const userRole = localStorage.getItem('role');

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };


    return (
        <>
            <button onClick={toggleSidebar} className="">
                {isSidebarVisible ? 'Hide' : 'Show'}
            </button>
            {
                isSidebarVisible && (
                    <nav class="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-base-200 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 lg:left-6 md:left-4 left-0 min-h-[auto] min-w-[64px] flex-col rounded-lg border md:scale-100 lg:scale-100 scale-75">

                        {/* Profile */}
                        <a
                            href="#profile"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-primary hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            {/* <!-- HeroIcon - User --> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 shrink-0"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>

                            <small class="text-center text-xs font-medium"> Profile </small>
                        </a>
                        <hr />

                        {/* Orders */}

                        <a
                            href="/orderHistory"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"

                        >
                            {/* <!-- HeroIcon - Orders --> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <small className="text-xs font-medium">Orders</small>
                        </a>
                        <hr />
                        

                        {/* Payment Methods  */}
                        <a
                            href="#payment"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            {/* <!-- HeroIcon - Payment --> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                            </svg>
                            <small class="text-xs font-medium">Payment</small>
                        </a>
                        {/* My Assigned Orders (Only for Admin) */}
                        {userRole === 'admin' && (
                            <>
                                <hr />
                                <a
                                    href="/assignedOrdersAdmin"
                                    className="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                                >
                                    {/* <!-- HeroIcon - Orders --> */}
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
                            </>
                        )}

                        {/* Logout Methods  */}
                        <a
                            href="#payment"
                            class="flex aspect-square min-h-[32px] flex-col items-center justify-center gap-1 rounded-md p-1.5 text-base hover:bg-primary-content transition-colors duration-300 ease-in-out"
                        >
                            {/* <!-- HeroIcon - Payment --> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                            </svg>
                            <small class="text-xs font-medium">Logout</small>
                        </a>

                    </nav>
                )
            }
        </>
    )
}

export default Sidebar