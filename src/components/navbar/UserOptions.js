import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../app/GlobalRedux/Features/auth/AuthSlice';
import { useEffect, useState } from 'react';

export default function UserOptions({ handleLogout }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userObject = JSON.parse(storedUser);
                dispatch(login(userObject));
            }
        }
    }, [dispatch]);

    return (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            {!isAuthenticated ? (
                <>
                    <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                    </a>
                </>
            ) : (
                <>
                    <a href="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 shrink-0"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <button onClick={handleLogout} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign Out
                    </button>
                </>
            )}
        </div>
    );
}
