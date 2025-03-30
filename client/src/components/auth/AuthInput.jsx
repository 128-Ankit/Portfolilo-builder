import React from 'react';

const AuthInput = ({ label, type = "text", name, onChange, required = false, placeholder }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-blue-300">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full bg-blue-950/30 border border-blue-800/50 rounded-lg px-4 py-2 text-blue-100 placeholder-blue-400/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
        </div>
    );
};

export default AuthInput;
