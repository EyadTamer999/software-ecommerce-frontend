"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Notification from '../../components/notification';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [notification, setNotification] = useState({ message: '', type: '' });


  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({message: '', type: ''});
    // `${apiUrl}/auth-gateway/login`

    try {
      const response = await fetch(`http://localhost:3001/auth-gateway/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotification({ message: result.error || 'Login failed', type: 'error' });
      } else {
        // Handle successful login
        const token = result.access_token;
        const payload = jwtDecode(token);

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(payload))
        localStorage.setItem('role', payload.role )
        
        setNotification({ message: 'Login successful!', type: 'success' });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setNotification({ message: 'An unexpected error occurred', type: 'error' });
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <div>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })} 
      />
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <form
                onSubmit={handleLogin}
                class="flex flex-col w-full h-full pb-6 text-center rounded-3xl"
              >
                <h3 class="mb-3 text-4xl font-extrabold text-base-content">
                  Sign In
                </h3>
                <p class="mb-4 text-base-content">
                  Enter your email and password
                </p>
                <button type="button" class="px-4 py-2 border flex gap-2 btn bg-base-100 rounded-2xl">
                  <img
                    class="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Sign in with Google</span>
                </button>
                <div class="flex items-center mb-3">
                  <hr class="h-0 border-b border-solid border-base-200 grow" />
                  <p class="mx-4 text-base-content"><strong>or</strong></p>
                  <hr class="h-0 border-b border-solid border-base-200 grow" />
                </div>
                <div class="flex flex-col space-y-3 mb-5">
                  <label
                    for="email"
                    class="mb-2 text-sm text-start text-base-content"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter a valid email"
                    class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                  />
                  <label
                    for="password"
                    class="mb-2 text-sm text-start text-base-content"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                    placeholder="Enter a password"
                    class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                  />
                </div>
                <div class="flex flex-row justify-between mb-4">
                  <label class="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span class="ml-3 text-sm font-normal text-base-content">
                      Keep me logged in
                    </span>
                  </label>
                  <a
                    href="javascript:void(0)"
                    class="mr-3 text-sm font-bold text-base-content"
                  >
                    Forgot password?
                  </a>
                </div>
                <button type="submit" class="w-full btn btn-primary rounded-2xl ">
                  Sign In
                </button>
                <p class="text-sm leading-relaxed text-base-content mt-3">
                  Not registered yet?{" "}
                  <a href="signup" class="font-bold text-base-content">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
