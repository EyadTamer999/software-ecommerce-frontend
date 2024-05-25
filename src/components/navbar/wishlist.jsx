import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getCart, removeCart } from './fetchApi';
import { addToCart } from '../../app/product/fetchApi';

export default function Cart({ open, setOpen }) {
    const [cartProducts, setCartProducts] = useState([]);

    const fetchCart = async () => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        let mergedCart = localCart;

        if (localStorage.getItem('token')) {
            const serverCart = await getCart();
            if (Array.isArray(serverCart)) {
                mergedCart = mergeCarts(localCart, serverCart);
                localStorage.setItem('cart', JSON.stringify(mergedCart));

                // Add merged cart to the server
                await addMergedCartToServer(mergedCart);
            }
        }

        setCartProducts(mergedCart);
    };

    const mergeCarts = (localCart, serverCart) => {
        const mergedCart = [...localCart];

        serverCart.forEach(serverItem => {
            const localItemIndex = mergedCart.findIndex(item => item._id === serverItem._id);
            if (localItemIndex > -1) {
                mergedCart[localItemIndex].quantity += serverItem.quantity;
            } else {
                mergedCart.push(serverItem);
            }
        });

        return mergedCart;
    };

    const addMergedCartToServer = async (mergedCart) => {
        for (const item of mergedCart) {
            const cartItem = {
                id: item._id,
                name: item.name,
                rent: item.rent || false,
                rent_duration: item.rent_duration || 0,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
                material: item.material,
                price: item.price,
            };
            await addToCart(cartItem);
        }
    };

    useEffect(() => {
        if (open) {
            fetchCart();
        }
    }, [open]);

    const handleRemoveItem = async (productId) => {
        if (localStorage.getItem('token')) {
            await removeCart(productId);
        } else {
            const updatedCart = cartProducts.filter(item => item._id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartProducts(updatedCart);
        }
    };

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
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart</Dialog.Title>
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

                                            {cartProducts.length === 0 ? (
                                                <div className="mt-6">
                                                    <p className="text-sm text-gray-500">Your cart is empty</p>
                                                    <div className="mt-6">
                                                        <a
                                                            onClick={() => setOpen(false)}
                                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                        >
                                                            Continue Shopping
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {cartProducts.map((product) => (
                                                                <li key={product._id} className="flex py-6">
                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href={`/product?id=${product.id}`}>{product.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">EGP {product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {product.quantity}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.rent ? 'Rent' : 'Buy'}</p>
                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleRemoveItem(product._id);
                                                                                    }}
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
                                            )}
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                {cartProducts.length === 0 ? null : (
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <p>Subtotal</p>
                                                        <p>
                                                            EGP {cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}
                                                        </p>
                                                    </div>
                                                )}
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        onClick={
                                                            () => {
                                                                if (localStorage.getItem('token')) {
                                                                    // Redirect to checkout page
                                                                    window.location.href = '/order';
                                                                }
                                                                else {
                                                                    // Redirect to login page
                                                                    window.location.href = '/login';
                                                                }
                                                            }
                                                        }
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
