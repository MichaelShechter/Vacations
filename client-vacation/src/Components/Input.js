import React, { Fragment } from "react";

const Input = ({
  label,
  type,
  accept,
  id,
  defaultValue,
  placeHolder,
  onChange,
  onBlur,
  value,
  error
}) => {
  return (
    <div>
      <p>{label}</p>
      <Fragment>
        <input
          id={id}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type ? type : "text"}
          accept={accept ? accept :null}
          defaultValue={defaultValue ? defaultValue :null}
        />
        <p style={{ color: "red" }}>{error}</p>
      </Fragment>
    </div>
  );
};

export default Input;
