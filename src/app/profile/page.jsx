"use client";
import Navbar from '../../components/navbar'
import React, { useState } from 'react'
import Sidebar from './sidebar'

const Profile = () => {

    const [choice, setChoice] = useState('Profile')

    return (
        <div class="relative bg-gray-50 w-screen h-screen pattern">

            <h1 class="text-4xl font-bold text-center text-gray-800 pt-4">Page Name {choice}</h1>

            <Sidebar choice={choice} />
        </div>

    )
}

export default Profile