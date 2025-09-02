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
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2 font-mono">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm font-mono"
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