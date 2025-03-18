import React from 'react';
import './styles/CustomInput.css';

interface CustomInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  step?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  label,
  required,
  step,
}) => (
  <div className="custom-input-container">
    <label className="custom-input-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      step={step}
      className="custom-input"
    />
  </div>
);

export default CustomInput;
