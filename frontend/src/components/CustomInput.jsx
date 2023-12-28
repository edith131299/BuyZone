import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    classname,
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
        className={`form-control${classname ? classname : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        hidden={hidden}
      />
    </div>
  );
};

export default CustomInput;
