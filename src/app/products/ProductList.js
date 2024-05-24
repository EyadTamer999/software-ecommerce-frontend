import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ title, products }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products && products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            {loading ? (
                <div className="flex justify-center items-center mt-6">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
