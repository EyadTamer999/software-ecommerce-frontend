import React from 'react';

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
        id: 3,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
];

const Order = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
                <div className="mt-8 w-full">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
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
                <div className='px-10 py-1 sm:px-3' >
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
                                                        <p>Tax:</p>
                                                        <p>$262.00</p>
                                                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
                                                        <p>products Price:</p>
                                                        <p>$262.00</p>
                                                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
                        <p>Total:</p>
                        <p>$262.00</p>
                    </div>  
                    <button class="btn btn-block">Go To payment Method</button>                                                 
                </div>
                
            </div>
            <div className="lg:w-1/2 p-8">
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
