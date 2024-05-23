"use client";
import React, { useState, useEffect } from "react";

const Signup = () => {
  const [stepsData, setStepsData] = useState([
    { title: "Personal Information", isActive: true },
    { title: "Company Details", isActive: false },
    { title: "Review & Submit", isActive: false },
  ]);

  // TODO fix error
  const currentStepIndex = stepsData.findIndex((step) => step.isActive);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: {
      label: "",
      appartment: "",
      floor: "",
      street: "",
      building: "",
      postalcode: "",
      city: "",
      country: "",
      state: "",
      extra_description: "",
    },
  });

  const [ErrorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState(false);

  const handleNextStep = () => {
    console.log(stepsData);

    const newStepsData = stepsData.map((step, index) => {
      // check if a field is empty
      if (currentStepIndex === 0) {
        if (
          data.firstName == "" ||
          data.lastName == "" ||
          data.phoneNumber == "" ||
          data.email == "" ||
          data.password == "" ||
          data.confirmPassword == ""
        ) {
          setErrorMessage("Please fill all fields");
          setError(true);

          return;
        }
      }

      if (currentStepIndex === 1) {
        if (
          (data.companyName === "") ||
          (data.companyAddress.appartment === "") |
            (data.companyAddress.building === "") |
            (data.companyAddress.city === "") |
            (data.companyAddress.country === "") |
            (data.companyAddress.extra_description === "") |
            (data.companyAddress.floor === "") |
            (data.companyAddress.label === "") |
            (data.companyAddress.postalcode === "") |
            (data.companyAddress.state === "") |
            (data.companyAddress.street === "")
        ) {
          setErrorMessage("Please fill all fields");
          setError(true);

          return;
        }
      }

      if (index === currentStepIndex + 1) {
        return { ...step, isActive: true };
      }
      return { ...step, isActive: false };
    });
    setStepsData(newStepsData);
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
        setError(false);
      }, 3000);
    }
  }, [Error]);

  return (
    <>
      {Error && (
        <div role="alert" className="alert alert-error">
          <button
            className="alert-close cursor-pointer"
            onClick={() => setError(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span>{ErrorMessage}</span>
        </div>
      )}
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
              <ul className="steps my-5 mx-full">
                {stepsData.map((step) => (
                  <li
                    key={step.title}
                    className={`step ${step.isActive ? "step-primary" : ""}`}
                  >
                    {step.title}
                  </li>
                ))}
              </ul>
              {currentStepIndex === 0 && (
                <>
                  {/* Personal Information Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>First Name</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                        id="name"
                        type="text"
                        placeholder="Enter your first name"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="last name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Last Name</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                        id="last name"
                        type="text"
                        placeholder="Enter your last name"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="phone"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Phone Number</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, phoneNumber: e.target.value })
                        }
                        id="phone"
                        type="text"
                        placeholder="Enter your phone number"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="email"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Email</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="password"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Password</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="confirm password"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Confirm Password</strong>
                      </label>
                      <input
                        onChange={(e) =>
                          setData({ ...data, confirmPassword: e.target.value })
                        }
                        id="confirm password"
                        type="password"
                        placeholder="Enter your password again"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStepIndex === 1 && (
                <>
                  {/* Company Details Form */}
                  <div className="grid grid-cols-2 gap-4 justify-center">
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Company Name</strong>
                      </label>
                      <input
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                        id="company name"
                        type="text"
                        placeholder="Enter your company name"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="street name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Street Name</strong>
                      </label>
                      <input
                        id="street name"
                        type="text"
                        placeholder="Enter company's street name"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company address"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Building</strong>
                      </label>
                      <input
                        id="building"
                        type="text"
                        placeholder="Enter company's building"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company apartment"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Apartment</strong>
                      </label>
                      <input
                        id="company apatment"
                        type="text"
                        placeholder="Enter company's apartment"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company floor"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Floor</strong>
                      </label>
                      <input
                        id="company floor"
                        type="text"
                        placeholder="Enter company's floor"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company country"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Country</strong>
                      </label>
                      <input
                        id="company country"
                        type="text"
                        placeholder="Enter company's country"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company state"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>State</strong>
                      </label>
                      <input
                        id="company state"
                        type="text"
                        placeholder="Enter company's state"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company city"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>City</strong>
                      </label>
                      <input
                        id="company city"
                        type="text"
                        placeholder="Enter company's city"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company postal code"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Postal Code</strong>
                      </label>
                      <input
                        id="company postal code"
                        type="text"
                        placeholder="Enter company's postal code"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company extra"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        <strong>Extra description</strong>
                      </label>
                      <input
                        id="company extra"
                        type="text"
                        placeholder="Enter extra decription"
                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStepIndex === 2 && (
                <>
                  {/* Review & Submit Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        First Name*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.firstName}
                      </label>
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="last name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        Last Name*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.lastName}
                      </label>
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="phone"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        Phone Number*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.phoneNumber}
                      </label>
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="email"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        Email*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.email}
                      </label>
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company name"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        Company Name*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.companyName}
                      </label>
                    </div>
                    <div className="flex flex-col space-y-3 mb-5">
                      <label
                        for="company address"
                        className="mb-2 text-sm text-start text-base-content"
                      >
                        Company Address*
                      </label>
                      <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {data.companyAddress}
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
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
                    ? "Submit"
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
