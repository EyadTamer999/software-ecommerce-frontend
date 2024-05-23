import React from 'react';

const ReviewSubmitForm = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.keys(data).map((key) => (
                <div className="flex flex-col space-y-3 mb-5" key={key}>
                    <label className="mb-2 text-sm text-start text-base-content">
                        <strong>{key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}</strong>
                    </label>
                    <label className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl">
                        {typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ReviewSubmitForm;
