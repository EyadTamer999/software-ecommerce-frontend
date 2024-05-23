import React from "react";

const CompanyDetailsForm = ({ data, setData, handleChange }) => {
  const addressFields = [
    {
      label: "Street Name",
      key: "street",
      placeholder: "Enter company's street name",
    },
    { label: "Label", key: "label", placeholder: "Enter company's label" },
    {
      label: "Building",
      key: "building",
      placeholder: "Enter company's building",
    },
    {
      label: "Apartment",
      key: "apartment",
      placeholder: "Enter company's apartment",
    },
    { label: "Floor", key: "floor", placeholder: "Enter company's floor" },
    {
      label: "Country",
      key: "country",
      placeholder: "Enter company's country",
    },
    { label: "State", key: "state", placeholder: "Enter company's state" },
    { label: "City", key: "city", placeholder: "Enter company's city" },
    {
      label: "Postal Code",
      key: "postalCode",
      placeholder: "Enter company's postal code",
    },
    {
      label: "Extra description",
      key: "extra_description",
      placeholder: "Enter extra description",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <label className="mb-2 text-sm text-start text-base-content">
          <strong>Company Name</strong>
        </label>
        <input
          onChange={(e) => setData({ ...data, companyName: e.target.value })}
          value={data.companyName || ""}
          type="text"
          placeholder="Enter your company name"
          className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
        />
      </div>
      {addressFields.map(({ label, key, placeholder }) => (
        <div key={key} className="flex flex-col space-y-3 mb-5">
          <label className="mb-2 text-sm text-start text-base-content">
            <strong>{label}</strong>
          </label>
          <input
            onChange={(e) => handleChange(key, e.target.value)}
            value={data.companyAddress[key] || ""}
            type="text"
            placeholder={placeholder}
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default CompanyDetailsForm;
