import { HeartIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function UtilityButtons({ setOpenCart, setOpenWishlist }) {
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

            <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
            </div>

            {/* Wishlist */}
            <div className="ml-4 flow-root lg:ml-6">
                <button onClick={() => setOpenWishlist(true)} className="group -m-2 flex items-center p-2">
                    <HeartIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in wishlist, view wishlist</span>
                </button>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
                <button onClick={() => setOpenCart(true)} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                </button>
            </div>
        </div>
    );
}
