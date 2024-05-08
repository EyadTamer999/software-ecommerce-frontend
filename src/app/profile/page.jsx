import Navbar from '@/components/Navbar'
import React from 'react'
import Sidebar from './sidebar'

const Profile = () => {
    return (
        <div class="relative bg-gray-50 w-screen h-screen pattern">

            <h1 class="text-4xl font-bold text-center text-gray-800 pt-4">Sidebar</h1>

            <Sidebar />
        </div>

    )
}

export default Profile