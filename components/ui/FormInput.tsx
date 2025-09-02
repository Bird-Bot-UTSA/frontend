import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2 font-mono">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm font-mono"
        required={required}
      />
    </div>
  );
};

export default FormInput; 