import React from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';

export default function ProductCard({ product }) {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href={"/product/" + product._id} >
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.material}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">EGP {product.buy_price}</p>
                </div>
            </div>
            <div className="mt-2 flex space-x-2 w-full">
                {/* TODO add functionality */}
                <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
        </div >
    );
}
