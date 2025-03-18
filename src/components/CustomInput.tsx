import React from 'react';
import './styles/CustomInput.css';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className="custom-input-group">
      <label className="custom-input-label">{label}</label>
      <input className="custom-input" {...props} />
    </div>
  );
};

export default CustomInput;
