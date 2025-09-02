import React from 'react';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 text-gray-300 mb-2 font-mono">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 border-neutral-700 rounded-lg bg-transparent text-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-2xl font-mono"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description ? `${option.label} - ${option.description}` : option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect; 