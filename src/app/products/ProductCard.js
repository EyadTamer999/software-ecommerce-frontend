import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';
import { addToCart } from '../product/fetchApi';

export default function ProductCard({ product, isSaleList }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (product) {
            setLoading(false);
        }
    }, [product]);

    const handleAddToCart = async (product) => {
        const cartItem = {
            id: product._id,
            name: product.name,
            rent: false,
            rent_duration: 0,
            quantity: 1,
            size: "Medium",
            color: "red",
            material: product.material,
            price: product.buy_price,
        };

        console.log("cartitem", cartItem);

        // save item to cart localstorage
        let cart = localStorage.getItem('cart');
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }

        // if item already exists in cart, increase quantity
        const existingItem = cart.find((item) => item.id === cartItem.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        if (localStorage.getItem('token') !== null) {
            // add to cart API
            addToCart(cartItem);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {loading ? (
                <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton h-32 w-full bg-gray-200 animate-pulse"></div>
                    <div className="skeleton h-4 w-28 bg-gray-200 animate-pulse"></div>
                    <div className="skeleton h-4 w-full bg-gray-200 animate-pulse"></div>
                    <div className="skeleton h-4 w-full bg-gray-200 animate-pulse"></div>
                </div>
            ) : (
                <div key={product.id} className="group relative">
                    <div
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <a
                            href={`product/?id=${product._id}`}
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                            />
                        </a>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={`product/?id=${product._id}`}>
                                    {product.name}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                            <p className="text-sm font-medium text-gray-900">EGP {product.buy_price}</p>
                            {isSaleList && (
                                <p className="text-sm font-medium text-red-600">{product.discount}%</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 flex space-x-2 w-full">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Rent
                        </button>
                        <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <HeartIcon className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}
