"use client";
import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import PersonalInformationForm from './PersonalInformationForm';
import CompanyDetailsForm from './CompanyDetailsForm';
import ReviewSubmitForm from './ReviewSubmitForm';

const Signup = () => {
  const [stepsData, setStepsData] = useState([
    { title: "Personal Information", isActive: true },
    { title: "Company Details", isActive: false },
    { title: "Review & Submit", isActive: false },
  ]);

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
      companyAddress: {
        ...data.companyAddress,
        [key]: value,
      },
    });
  };

  const [ErrorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState(false);

  const handleNextStep = () => {
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
          data.companyAddress.apartment === "" ||
          data.companyAddress.building === "" ||
          data.companyAddress.city === "" ||
          data.companyAddress.country === "" ||
          data.companyAddress.extra_description === "" ||
          data.companyAddress.floor === "" ||
          data.companyAddress.label === "" ||
          data.companyAddress.postalCode === "" ||
          data.companyAddress.state === "" ||
          data.companyAddress.street === ""
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
          <button className="alert-close cursor-pointer" onClick={() => setError(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <span>{ErrorMessage}</span>
        </div>
      )}
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-base-content">Sign up</h3>
              <p className="mb-4 text-base-content">Create your account</p>
              <span className="text-sm text-base-content">Already have an account? <a href="login" className="font-bold text-base-content">Sign in</a></span>

              <StepIndicator stepsData={stepsData} />

              {currentStepIndex === 0 && <PersonalInformationForm data={data} setData={setData} />}
              {currentStepIndex === 1 && <CompanyDetailsForm data={data} setData={setData} handleChange={handleChange} />}
              {currentStepIndex === 2 && <ReviewSubmitForm data={data} />}

              <div className="flex justify-between space-x-3">
                {currentStepIndex !== 0 && (
                  <button type="button" onClick={handlePrevStep} className="flex items-center justify-center w-1/2 px-6 py-3 text-sm font-medium text-white bg-gray-500 rounded-2xl">
                    Previous
                  </button>
                )}
                <button type="button" onClick={handleNextStep} className="flex items-center justify-center w-1/2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-2xl">
                  {currentStepIndex === stepsData.length - 1 ? "Submit" : "Next"}
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
