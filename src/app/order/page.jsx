'use client';
import React, { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem('token');

const Order = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the cart details
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${BASE_URL}/getCart`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const cartData = await response.json();
                console.log("cartData---->" , cartData)
                // Fetch product images
                const cartWithImages = await Promise.all(cartData.map(async (item) => {
                    const product = await getProductById(item.id);
                    return { ...item, imageSrc: product.images, imageAlt: item.name };
                }));

                 setCart(cartWithImages);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        // fetchCart();
    }, []);

    const getProductById = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/getProduct/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("product---->" , response.json())
            return response.json();
        } catch (e) {
            console.log(e);
        }
    };
  

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
                <div className="mt-8 w-full">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        {/* <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        /> */}
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={product.href}>{product.name}</a>
                                                </h3>
                                                <p className="ml-4">{product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {product.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='card shadow-2xl px-10 py-1 sm:px-3 m-10 justify-center'>
                    <div className="justify-between mt-2 flex items-center">
                        <input
                            type="text"
                            placeholder="Promo Code"
                            className="input input-sm input-bordered mr-2 py-2 px-3"
                        />
                        <button
                            className="btn btn-sm bg-gray-500 text-white px-3 py-2 rounded-md border-0"
                        >
                            Apply Promo Code
                        </button>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3 mt-2">
                        <p>Tax:</p>
                        <p>$262.00</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
                        <p>Products Price:</p>
                        <p>$262.00</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
                        <p>Total:</p>
                        <p>$262.00</p>
                    </div>
                    <button className="btn btn-block px-3 py-2 rounded-md mt-4 border-0">Go To Payment Method</button>
                </div>
            </div>
            <div className="lg:w-1/2 p-2">
                <div className="hero bg-base-400" style={{ height: 'calc(100% - 1rem)' }}>
                    <div className="hero-content">
                        <div className="card shadow-2xl bg-base-100">
                            <div className="card-body grid grid-cols-2 gap-4">
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text">Label</span>
                                    </label>
                                    <input type="text" placeholder="Label" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Apartment</span>
                                    </label>
                                    <input type="text" placeholder="Apartment" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Floor</span>
                                    </label>
                                    <input type="text" placeholder="Floor" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Street</span>
                                    </label>
                                    <input type="text" placeholder="Street" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Building</span>
                                    </label>
                                    <input type="text" placeholder="Building" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Postal Code</span>
                                    </label>
                                    <input type="text" placeholder="Postal Code" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input type="text" placeholder="City" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Country</span>
                                    </label>
                                    <input type="text" placeholder="Country" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">State</span>
                                    </label>
                                    <input type="text" placeholder="State" className="input input-bordered py-1 px-2" required />
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text">Extra Description</span>
                                    </label>
                                    <input type="text" placeholder="Extra Description" className="input input-bordered py-1 px-2" required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
