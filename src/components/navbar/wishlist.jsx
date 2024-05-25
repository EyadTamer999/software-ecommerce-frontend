import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getWishlist, removeWishlist } from './fetchApi';
import { addToCart } from '../../app/product/fetchApi';

export default function Wishlist({ open, setOpen }) {

    const [wishlistProducts, setWishlistProducts] = useState([]);

    const fetchWishlist = async () => {
        const response = await getWishlist();
        setWishlistProducts(response.data);
        console.log(response.data);
    };

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

        // remove item from wishlist
        removeWishlist(product._id);

        // update wishlist
        setWishlistProducts(wishlistProducts.filter((item) => item._id !== product._id));
    };

    useEffect(() => {
        if (open) {
            fetchWishlist();
        }
    }, [open]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Wishlist</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {wishlistProducts.map((product) => (
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
                                                                        <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <div className="flex">
                                                                            <button
                                                                                onClick={(e) => { handleAddToCart(product); }}
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Add to Cart
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <button
                                                                                onClick={(e) => { removeWishlist(product._id); setWishlistProducts(wishlistProducts.filter((item) => item._id !== product._id)); }}
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Remove from Wishlist
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

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Browsing
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    );
}
