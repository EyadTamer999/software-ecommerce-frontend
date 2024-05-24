"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Notification from "../../components/notification";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleResetPassword = async (e) => {
    console.log('token', token)
    console.log('email', email)
    e.preventDefault();
    setNotification({ message: "", type: "" });

    if (newPassword !== confirmPassword) {
      setNotification({
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/auth-gateway/reset-password?token=${token}&email=${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setNotification({
          message: result.error || "Password reset failed",
          type: "error",
        });
      } else {
        setNotification({
          message: "Password reset successful!",
          type: "success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setNotification({
        message: "An unexpected error occurred",
        type: "error",
      });
      console.error("Reset password error:", err);
    }
  };

  return (
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
              onSubmit={handleResetPassword}
              className="flex flex-col w-full h-full pb-6 text-center rounded-3xl"
            >
              <h3 className="mb-3 text-4xl font-extrabold text-base-content">
                Reset Password
              </h3>
              <p className="mb-4 text-base-content">Enter your new password</p>
              <div className="flex flex-col space-y-3 mb-5">
                <label
                  htmlFor="new-password"
                  className="mb-2 text-sm text-start text-base-content"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                />
                <label
                  htmlFor="confirm-password"
                  className="mb-2 text-sm text-start text-base-content"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                />
              </div>
              <button
                type="submit"
                className="w-full btn btn-primary rounded-2xl "
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
