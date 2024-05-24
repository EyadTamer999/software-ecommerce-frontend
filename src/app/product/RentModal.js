import { useState, useEffect } from 'react';

function RentModal({ isOpen, onClose, rentPrice, onSubmit }) {
    const [rentDuration, setRentDuration] = useState(1);
    const [totalPrice, setTotalPrice] = useState(rentPrice);

    useEffect(() => {
        setTotalPrice(rentDuration * rentPrice);
    }, [rentDuration, rentPrice]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit(rentDuration, totalPrice);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto p-10 border shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900">Rent Product</h3>
                    <div className="mt-6">
                        <p className="text-lg text-gray-500">
                            Rent price: EGP {rentPrice} per day
                        </p>
                        <input
                            type="number"
                            value={rentDuration}
                            onChange={(e) => setRentDuration(e.target.value)}
                            className="mt-4 border rounded-md p-2 w-full text-lg"
                            min="1"
                        />
                        <p className="text-lg text-gray-500 mt-4">
                            Total price: EGP {totalPrice}
                        </p>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RentModal;
