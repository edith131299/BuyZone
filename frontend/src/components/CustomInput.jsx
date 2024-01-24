import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    hidden,
  } = props;

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`bg-grey p-3 rounded-md w-full outline-none ${className ? className : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        hidden={hidden}
      />
    </div>
  );
};

export default CustomInput;
