"use client";
import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from './fetchApi';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const fetchFavorites = async () => {
        const response = await getFavorites();
        setFavoriteProducts(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div>
            <h1>Favorites</h1>

            {/* favorite products */}
            <div className="mt-8">
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {favoriteProducts.map((product) => (
                            <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={product.images[0] || 'placeholder.jpg'} // Handle case where there are no images
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <a href={`/product?id=${product._id}`}>{product.name}</a>
                                            </h3>
                                            <p className="ml-4">{product.buy_price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex">
                                            <button
                                                onClick={(e) => { removeFavorite(product._id); setFavoriteProducts(favoriteProducts.filter((item) => item._id !== product._id)); }}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
