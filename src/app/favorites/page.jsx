"use client";
import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from './fetchApi';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const fetchFavorites = async () => {
        const response = await getFavorites();
        setFavoriteProducts(response.data);
    };

    const handleRemoveFavorite = async (productId) => {
        await removeFavorite(productId);
        setFavoriteProducts(favoriteProducts.filter((item) => item._id !== productId));
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Favorites</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={product.images[0] || 'placeholder.jpg'} // Handle case where there are no images
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                <a href={`/product?id=${product._id}`}>{product.name}</a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            <p className="mt-2 text-xl font-semibold text-gray-900">{product.buy_price}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleRemoveFavorite(product._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
