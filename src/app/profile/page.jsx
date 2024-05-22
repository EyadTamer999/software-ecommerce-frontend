// "use client";
// import Navbar from '@/components/navbar'
// import React, { useState } from 'react'
// import Sidebar from './sidebar'

// const Profile = () => {

//     const [choice, setChoice] = useState('Profile')

//     return (
//         <div class="relative bg-gray-50 w-screen h-screen pattern">

//             <h1 class="text-4xl font-bold text-center text-gray-800 pt-4">Page Name {choice}</h1>

//             <Sidebar choice={choice} />
//         </div>

//     )
// }

// export default Profile

"use client";
import Navbar from '@/components/navbar'
import React, { useState } from 'react'
import Sidebar from './sidebar'
// import profileReducer from './Features/profile/profileSlice';
//import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'js-cookie';

const Profile = () => {
    const [choice, setChoice] = useState('Profile');

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        address: [{
            label: '',
            appartment: '',
            floor: '',
            street: '',
            building: '',
            postalcode: '',
            city: '',
            country: '',
            state: '',
            extra_description: ''
        }],
        cards: [{
            name: '',
            cardnumber: '',
            expiration: '',
            cvv: ''
        }]
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkZWhhYng2QGdtYWlsLmNvbSIsInVzZXIiOiI2NjQxMzg1N2IzODhiZTM4YzBmODJiNmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjQxNjcwMiwiZXhwIjoxNzE2NDIwMzAyfQ.Iq34c5jnZD3FFKvL7pUnqtbLq6lDxC0rCHPF4Hu-Ylk`

    

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        // setIsPasswordModalOpen(true)

        const input={
            "oldpassword":oldPassword,
            "newpassword":newPassword
        }
        console.log('oldpassword :', oldPassword, 'newpassword :', newPassword);
        const response = await fetch(`http://localhost:3001/auth-gateway/Update-Password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(input) // Add this line

        });
        console.log(response);
    
        if (response.ok) {
            console.log('Password updated successfully');
            setIsPasswordModalOpen(false);
        } else {
            console.error('Failed to update password');
        }
    };

    const handleViewAddressClick = async (e) => {
        setIsModalOpen(true);

        const response = await fetch(`http://localhost:3001/Users/view-address`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            const AddressData = await response.json();
            if (Array.isArray(AddressData)) {
                setAddressData(AddressData); // Update addressData in the state
            } else {
                console.error('Expected array from server, but received:', data);
            }
        } else {
            console.error('Failed to update');
        }
    };
    const handleAddAddress = async (e) => {
        e.preventDefault();

        // Add a new address to data
        const newData = {
            ...data,
            address: [...data.address, {
                label: '',
                appartment: '',
                floor: '',
                street: '',
                building: '',
                postalcode: '',
                city: '',
                country: '',
                state: '',
                extra_description: ''
            }]
        };

        // Send the updated data to the backend
        const response = await fetch(`http://localhost:3001/Users/add-address`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        });

        // Update the state with the new data
        setData(newData);
    };

    const handleDeleteAddress = async (index) => {
        const response = await fetch(`localhost:3001/Users/delete-address`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        setData(prevData => ({
            ...prevData,
            address: prevData.address.filter((item, i) => i !== index)
        }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        const [main, sub] = name.split('.');

        if (sub) {
            setData(prevData => ({
                ...prevData,
                [main]: prevData[main].map((item, index) => {
                    return {
                        ...item,
                        [sub]: value
                    }
                })
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    //const token= localStorage.getItem('token')
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3001/Users/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // credentials: 'include',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Profile updated successfully');
            // success('Profile updated successfully');
            //window.location.reload();
        } else {
            console.error('Failed to update');
            const result = await response.json();
            //fail('Failed to update: ' + (result.message || response.statusText));
        }
    };

    // const fail = (alert) => {
    //     toast.error(alert, {
    //         position: 'top-center',
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };

    // const success = (alert) => {
    //     toast.success(alert, {
    //         position: 'top-center',
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //     });
    // };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
            <Sidebar choice={choice} />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div> */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                        Company
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="company"
                        type="text"
                        name="company"
                        value={data.company}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                <h2 className="text-xl font-bold mt-6 mb-4 text-center">Cards</h2>
                {data.cards.map((card, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name: {`cards.${index}.name`}
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Card Number: {`cards.${index}.cardnumber`}
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Expiration Date: {`cards.${index}.expiration`}
                        </label>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                                setData(prevData => ({
                                    ...prevData,
                                    cards: prevData.cards.slice(0, -1)
                                }));
                            }}
                        >
                            Delete Card
                        </button>
                    </div>
                ))}

                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                            setData(prevData => ({
                                ...prevData,
                                cards: [...prevData.cards, { name: '', cardnumber: '', expiration: '', cvv: '' }]
                            }));
                        }}
                    >
                        Add Card
                    </button>
                    {/* <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setData(prevData => ({
                ...prevData,
                cards: prevData.cards.slice(0, -1)
              }));
            }}
          >
            Delete Card
          </button> */}
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Update Profile
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        // onClick={() => setIsModalOpen(true)}
                        onClick={handleViewAddressClick}

                    >
                        View Address
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        onClick={() => setIsPasswordModalOpen(true)}
                        // () => setIsPasswordModalOpen(true)
                    >
                        Update Password
                    </button>
                </div>

            </form>
            {/* <ToastContainer /> */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Addresses</h3>
                                        {addressData.map((addr, index) => (
                                            <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Label: {addr.label}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Apartment: {addr.appartment}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Floor: {addr.floor}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Street: {addr.street}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Building: {addr.building}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Postal Code: {addr.postalcode}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    City: {addr.city}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Country: {addr.country}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    State: {addr.state}
                                                </label>
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Extra Description: {addr.extra_description}
                                                </label>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="button"
                                                    onClick={() => handleDeleteAddress(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            // onClick={() => handleAddAddress()}
                                            onClick={(e) => handleAddAddress(e)}
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isPasswordModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl w-1/3">
                    <div className="p-6">
                        <h2 className="text-2xl mb-4 text-center font-semibold">Update Password</h2>
                        {/* <form onSubmit={handleSubmit}> */}
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <button type="submit" onClick={handleUpdatePassword}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                <button  type="submit" onClick={() => setIsPasswordModalOpen(false)} className="text-gray-500 hover:text-gray-700">Close</button>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        )}
        </div>

    );
};

export default Profile;