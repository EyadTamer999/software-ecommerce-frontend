"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Notification from "../../components/notification";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      const response = await fetch(`${apiUrl}/auth-gateway/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotification({
          message: result.error || "Login failed",
          type: "error",
        });
      } else {
        // Handle successful login
        const token = result.access_token;
        const payload = jwtDecode(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem("role", payload.role);

        setNotification({ message: "Login successful!", type: "success" });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setNotification({
        message: "An unexpected error occurred",
        type: "error",
      });
      console.error("Login error:", err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      const response = await fetch(`${apiUrl}/auth-gateway/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotification({
          message: result.error || "Failed to send reset email",
          type: "error",
        });
      } else {
        setNotification({
          message: "Password reset email sent!",
          type: "success",
        });
      }
    } catch (err) {
      setNotification({
        message: "An unexpected error occurred",
        type: "error",
      });
      console.error("Forgot password error:", err);
    }
  };

  return (
    <>
      <div>
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                onSubmit={handleLogin}
                className="flex flex-col w-full h-full pb-6 text-center rounded-3xl"
              >
                <h3 className="mb-3 text-4xl font-extrabold text-base-content">
                  Sign In
                </h3>
                <p className="mb-4 text-base-content">
                  Enter your email and password
                </p>
                <button
                  type="button"
                  className="px-4 py-2 border flex gap-2 btn bg-base-100 rounded-2xl"
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Sign in with Google</span>
                </button>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-base-200 grow" />
                  <p className="mx-4 text-base-content">
                    <strong>or</strong>
                  </p>
                  <hr className="h-0 border-b border-solid border-base-200 grow" />
                </div>
                <div className="flex flex-col space-y-3 mb-5">
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm text-start text-base-content"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter a valid email"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                  />
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm text-start text-base-content"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                  />
                </div>
                <div className="flex flex-row justify-between mb-4">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="ml-3 text-sm font-normal text-base-content">
                      Keep me logged in
                    </span>
                  </label>
                  <a
                    href="javascript:void(0)"
                    className="mr-3 text-sm font-bold text-base-content"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full btn btn-primary rounded-2xl "
                >
                  Sign In
                </button>
                <p className="text-sm leading-relaxed text-base-content mt-3">
                  Not registered yet?{" "}
                  <a href="signup" className="font-bold text-base-content">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Forgot Password</h3>
          <p className="py-4">Enter your email to reset your password.</p>
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
            />
            <button
              type="submit"
              className="w-full btn btn-primary rounded-2xl"
            >
              Send Request
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;
