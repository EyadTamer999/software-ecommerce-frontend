"use client";
import React, { useState } from 'react'

const Sidebar = () => {

    const [isSidebarVisible, setSidebarVisible] = useState(true);

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
                    <nav class="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
                        <a
                            href="#profile"
                            class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-50 text-indigo-600 "
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

                        <a href="/" class="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 ">
                            {/* <!-- HeroIcon - Home Modern --> */}
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
                                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                                />
                            </svg>

                            <small className="text-xs font-medium">Home</small>
                        </a>

                        <hr />

                        <a href="/" class="flex h-16 w-16 flex-col items-center justify-center gap-1 text-gray-700 ">
                            {/* <!-- HeroIcon - Logout --> */}
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
                            <small className="text-xs font-medium">Logout</small>
                        </a>


                    </nav>
                )
            }
        </>
    )
}

export default Sidebar