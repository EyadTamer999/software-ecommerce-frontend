import React from "react";

const PersonalInformationForm = ({ data, setData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          label: "First Name",
          key: "firstName",
          type: "text",
          placeholder: "Enter your first name",
        },
        {
          label: "Last Name",
          key: "lastName",
          type: "text",
          placeholder: "Enter your last name",
        },
        {
          label: "Phone Number",
          key: "phoneNumber",
          type: "text",
          placeholder: "Enter your phone number",
        },
        {
          label: "Email",
          key: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          label: "Password",
          key: "password",
          type: "password",
          placeholder: "Enter your password",
        },
        {
          label: "Confirm Password",
          key: "confirmPassword",
          type: "password",
          placeholder: "Enter your password again",
        },
      ].map(({ label, key, type, placeholder }) => (
        <div className="flex flex-col space-y-3 mb-5" key={key}>
          <label className="mb-2 text-sm text-start text-base-content">
            <strong>{label}</strong>
          </label>
          <input
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            value={data[key] || ""}
            type={type}
            placeholder={placeholder}
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInformationForm;
