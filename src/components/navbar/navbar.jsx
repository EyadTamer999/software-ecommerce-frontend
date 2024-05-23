"use client";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Logo from '../../../public/icon.svg';
import Cart from './cart';
import Wishlist from './wishlist';
import MobileMenu from './MobileMenu';
import UserOptions from './UserOptions';
import NavigationLinks from './NavigationLinks';
import UtilityButtons from './UtilityButtons';
import NotificationComponent from '../notification';
import { login, logout } from "../../app/GlobalRedux/Features/auth/AuthSlice";
import { useSelector } from 'react-redux';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    // Assuming `dispatch(logout())` is used here to handle the logout logic
    setNotification({ message: 'Logout successful!', type: 'success' });
    setTimeout(() => {
      window.location.href = '/';
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <>
      <NotificationComponent notification={notification} setNotification={setNotification} />
      <div className="bg-white z-[99]">
        <MobileMenu open={open} setOpen={setOpen} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>

          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={() => setOpen(true)}>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <span className="sr-only">PalletY</span>
                    <img className="h-8 w-auto" src={Logo.src} alt="" />
                  </a>
                </div>

                {/* Flyout menus */}
                <NavigationLinks />

                <UserOptions handleLogout={handleLogout} />

                <UtilityButtons setOpenCart={setOpenCart} setOpenWishlist={setOpenWishlist} />
              </div>
            </div>
          </nav>
        </header>
        <Cart open={openCart} setOpen={setOpenCart} />
        <Wishlist open={openWishlist} setOpen={setOpenWishlist} />
      </div>
    </>
  );
}
