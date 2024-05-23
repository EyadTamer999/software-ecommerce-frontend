import React from 'react';

const StepIndicator = ({ stepsData }) => {
    return (
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
    );
};

export default StepIndicator;
