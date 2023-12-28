import React from "react";

export default CustomInput = (props) => {
  const { type, name, placeholder, className, value, onChange, onBlur } = props;

  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`form-control${className}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>;
};
