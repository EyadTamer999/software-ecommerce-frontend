import Navbar from '@/components/Navbar'
import React from 'react'

const Profile = () => {
    return (
        <div class="container flex flex-col mx-auto bg-white">
            <aside class="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-10 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start" id="sidenav-main">

                <div class="relative pl-3 my-5 overflow-y-scroll">
                    <div class="flex flex-col w-full font-medium">

                        {/* <!-- Profile --> */}
                        <div>
                            <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                <a href="javascript:;" class="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Profile</a>
                            </span>
                        </div>

                        {/* <!-- Orders --> */}
                        <div>
                            <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                <a href="javascript:;" class="flex items
                                -center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Orders</a>
                            </span>
                        </div>

                        {/* <!-- Addresses --> */}
                        <div>
                            <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                <a href="javascript:;" class="flex items
                                -center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Addresses</a>
                            </span>
                        </div>

                        {/* <!-- Payment Methods --> */}
                        <div>
                            <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                <a href="javascript:;" class="flex items
                                -center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Payment Methods</a>
                            </span>
                        </div>

                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Profile