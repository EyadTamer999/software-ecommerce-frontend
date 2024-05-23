import { useState, useEffect } from 'react';
import { HeartIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function UtilityButtons({ setOpenCart, setOpenWishlist }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [cartItemCount, setCartItemCount] = useState(0);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);

    useEffect(() => {
        //TODO get cart and wishlist items count from the local storage

    }, []);

    const handleSearchClick = () => {
        setSearchOpen(!searchOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="ml-auto flex items-center">
            <div className="hidden lg:ml-8 lg:flex">
                <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png?20231030035225"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">EGP</span>
                    <span className="sr-only">, change currency</span>
                </a>
            </div>

            <div className="flex lg:ml-6 items-center relative">
                <button onClick={handleSearchClick} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div
                    className={`${searchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
                        } ml-2 transition-all duration-300 ease-in-out overflow-hidden`}
                >
                    <input
                        type="text"
                        className="p-2 border rounded-md w-full"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Wishlist */}
            <div className="ml-4 flow-root lg:ml-6">
                <button onClick={() => setOpenWishlist(true)} className="group -m-2 flex items-center p-2">
                    <HeartIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{wishlistItemCount}</span>
                    <span className="sr-only">items in wishlist, view wishlist</span>
                </button>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
                <button onClick={() => setOpenCart(true)} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItemCount}</span>
                    <span className="sr-only">items in cart, view bag</span>
                </button>
            </div>
        </div>
    );
}
