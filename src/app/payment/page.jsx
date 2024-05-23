"use client";
import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar'
import { card } from '@nextui-org/react';

const Payment = () => {

    const [choice, setChoice] = useState('payment')
    const [cards, setcard] = useState([]); // Assuming cards is an array of card objects
    const [isAddCardOpen, setAddCardOpen] = useState(false);

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchcards = async () => {

            try {
                const response = await fetch(`http://localhost:3001/Users/view-card`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //check if Unauthorized redirect to home
                if (response.status === 401) {
                    window.location.href = '/';
                }
                if (!response.ok) {
                    throw new Error('response was not ok');
                }

                const resdata = await response.json();
                const carddata = resdata.data;
                //console.log("profiledata: ", profiledata.data);
                console.log("user: ", carddata);

                //i want to get the data of the user and update the state with the data
                setcard(carddata);

                //console.log("user: ", user);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchcards();
    }, []);

    // Add your add card logic here
    const handleAddCard = async (e) => {
        e.preventDefault();

        const input = {
            "name": name,
            "cardnumber": cardNumber,
            "expiration": expirationDate,
            "cvv": cvv
        }


        try {
            const response = await fetch(`http://localhost:3001/Users/add-card`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(input)

            });


            //check if Unauthorized redirect to home
            if (response.status === 401) {
                window.location.href = '/';
            }
            if (!response.ok) {
                throw new Error('response was not ok');
            }

            const resdata = await response.json();
            const carddata = resdata.data;
            //console.log("profiledata: ", profiledata.data);
            console.log("user: ", carddata);

            //close the modal
            setAddCardOpen(false);
            //clear the form
            setName('');
            setCardNumber('');
            setExpirationDate('');
            setCvv('');
            
            //i want to get the data of the user and update the state with the data
            //setcard(carddata);

            //i want to get the card data and update the state with the data
            setcard([...cards, input]);
            
            console.log("user: ", user);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    const handleDeleteCard = async (id) => {

        //const data = {"id":id};
        console.log("id: ", id);
        const response = await fetch(`http://localhost:3001/Users/delete-card/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // credentials: 'include',
            
        });

        // const newcards = cards.filter(card => card._id !== id);
        // setcard(newcards);

        //i want to update the setcard with the new data
        //setcard(cards.filter(card => card._id !== id);


        if (response.ok) {
            setcard(cards.filter(card => card._id !== id));
        } else {
            console.error('Failed to delete');
        }
        
    };


    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Saved Cards</h1>
            {cards.map((card, index) => (
                <div key={index} className="mb-6 p-4 border rounded shadow-md">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name: <span className="font-normal">{card.name}</span>
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Card Number: <span className="font-normal">{card.cardnumber}</span>
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Expiration Date: <span className="font-normal">{card.expiration}</span>
                    </label>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
                        type="button"
                        onClick={() => handleDeleteCard(card._id)}
                    >
                        Delete Card
                    </button>
                </div>
            ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
                type="button"
                onClick={() => setAddCardOpen(true)}
            >
                Add Card
            </button>

            {isAddCardOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
                        {/* Add your form for adding a card here */}

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                id="cardNumber"
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                            <input
                                id="expirationDate"
                                type="text"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                id="cvv"
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
                            type="submit"
                            onClick={handleAddCard}
                        >
                            Add Card
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
                            type="submit"
                            onClick={() => setAddCardOpen(false)}
                        >
                            close
                        </button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Payment;
