"use client";
import React, { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import PersonalInformationForm from "./PersonalInformationForm";
import CompanyDetailsForm from "./CompanyDetailsForm";
import ReviewSubmitForm from "./ReviewSubmitForm";
import { HandleSignup, ResendEmailVerification } from "./fetchApi";
import Notification from "../../components/notification";

const Signup = () => {
  const [stepsData, setStepsData] = useState([
    { title: "Personal Information", isActive: true },
    { title: "Company Details", isActive: false },
    { title: "Review & Submit", isActive: false },
    { title: "Email Verification", isActive: false },
  ]);

  const currentStepIndex = stepsData.findIndex((step) => step.isActive);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    address: {
      label: "",
      apartment: "",
      floor: "",
      street: "",
      building: "",
      postalCode: "",
      city: "",
      country: "",
      state: "",
      extra_description: "",
    },
  });

  const handleChange = (key, value) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [key]: value,
      },
    });
  };

  const [ErrorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState(false);

  const handleNextStep = async () => {
    if (currentStepIndex === 2) {
      // Check if on the third step
      // Submit the signup data
      try {
        const response = await HandleSignup(data);
        if (response.success) {
          // Handle successful signup (e.g., navigate to another page or show a success message)
          setNotification({ message: response.message, type: "success" });
          console.log("Signup successful:", response);
          const newStepsData = stepsData.map((step, index) => {
            if (index === currentStepIndex + 1) {
              return { ...step, isActive: true };
            }
            return { ...step, isActive: false };
          });
          setStepsData(newStepsData);
        } else {
          setNotification({ message: response.message, type: "error" });
          // Handle errors returned by the API
          setErrorMessage(response.message || "Signup failed");
          setError(true);
        }
      } catch (error) {
        setNotification({
          message: "An unexpected error occurred",
          type: "error",
        });

        // Handle fetch error
        console.error("Signup error:", error);
        setErrorMessage("Signup failed due to an unexpected error");
        setError(true);
      }
    } else {
      const newStepsData = stepsData.map((step, index) => {
        if (currentStepIndex === 0) {
          if (
            data.firstName === "" ||
            data.lastName === "" ||
            data.phoneNumber === "" ||
            data.email === "" ||
            data.password === "" ||
            data.confirmPassword === ""
          ) {
            setErrorMessage("Please fill all fields");
            setError(true);
            return step;
          }
        }

        if (currentStepIndex === 1) {
          if (
            data.companyName === "" ||
            data.address.apartment === "" ||
            data.address.building === "" ||
            data.address.city === "" ||
            data.address.country === "" ||
            data.address.extra_description === "" ||
            data.address.floor === "" ||
            data.address.label === "" ||
            data.address.postalCode === "" ||
            data.address.state === "" ||
            data.address.street === ""
          ) {
            setErrorMessage("Please fill all fields");
            setError(true);
            return step;
          }
        }

        if (index === currentStepIndex + 1) {
          return { ...step, isActive: true };
        }
        return { ...step, isActive: false };
      });
      setStepsData(newStepsData);
    }
  };

  const handleResendEmail = async () => {
    try {
      console.log("email", data.email);
      const response = await ResendEmailVerification(data.email);
      if (response.success) {
        setNotification({ message: response.message, type: "success" });
        setErrorMessage("Verification email resent successfully.");
        setError(false);
      } else {
        setNotification({ message: response.message, type: "error" });
        setErrorMessage(
          response.message || "Failed to resend verification email."
        );
        setError(true);
      }
    } catch (error) {
      setNotification({
        message: "An unexpected error occurred",
        type: "error",
      });
      console.error("Resend email error:", error);
      setErrorMessage(
        "Failed to resend verification email due to an unexpected error."
      );
      setError(true);
    }
  };

  const handlePrevStep = () => {
    const newStepsData = stepsData.map((step, index) => {
      if (index === currentStepIndex - 1) {
        return { ...step, isActive: true };
      }
      return { ...step, isActive: false };
    });
    setStepsData(newStepsData);
  };

  useEffect(() => {
    if (Error) {
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  }, [Error]);

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-base-content">
                Sign up
              </h3>
              <p className="mb-4 text-base-content">Create your account</p>
              <span className="text-sm text-base-content">
                Already have an account?{" "}
                <a href="login" className="font-bold text-base-content">
                  Sign in
                </a>
              </span>

              <StepIndicator stepsData={stepsData} />

              {currentStepIndex === 0 && (
                <PersonalInformationForm data={data} setData={setData} />
              )}
              {currentStepIndex === 1 && (
                <CompanyDetailsForm
                  data={data}
                  setData={setData}
                  handleChange={handleChange}
                />
              )}
              {currentStepIndex === 2 && <ReviewSubmitForm data={data} />}
              {currentStepIndex === 3 && (
                <div className="flex flex-col items-center justify-center p-10">
                  <p className="mb-4">
                    A verification link has been sent to your email address.
                    Please check your inbox and follow the link to verify your
                    account.
                  </p>
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-2xl"
                  >
                    Resend Verification Email
                  </button>
                </div>
              )}

              <div className="flex justify-between space-x-3">
                {currentStepIndex !== 0 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center justify-center w-1/2 px-6 py-3 text-sm font-medium text-white bg-gray-500 rounded-2xl"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center justify-center w-1/2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-2xl"
                >
                  {currentStepIndex === stepsData.length - 1
                    ? "Go to Login"
                    : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
