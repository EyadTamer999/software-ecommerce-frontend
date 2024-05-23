import React from "react";

const ReviewSubmitForm = ({ data }) => {
  const renderData = (obj) => {
    return Object.keys(obj).map((key) => {
      const label =
        key
          .replace(/([A-Z])/g, " $1")
          .charAt(0)
          .toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1);
      return (
        <div className="flex flex-col space-y-3 mb-5" key={key}>
          <label className="mb-2 text-sm text-start text-base-content">
            <strong>{label}</strong>
          </label>
          <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
            {obj[key]}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-5 text-2xl font-bold text-base-content">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {renderData({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
          })}
        </div>
      </div>
      <div>
        <h3 className="mb-5 text-2xl font-bold text-base-content">
          Company Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {renderData({
            companyName: data.companyName,
            ...data.companyAddress,
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitForm;
