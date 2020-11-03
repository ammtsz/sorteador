import React from "react";
import "./form-input.styles.scss";

import Button from "../button/button.component";

const FormInput = ({
  equalStarted,
  handleSubmit,
  setData,
  btnContent,
  ...otherProps
}) => {
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        autoComplete="off"
        onChange={(event) => {
          handleChange(event);
        }}
        {...otherProps}
      />

      <Button
        content={btnContent}
        equalStarted={equalStarted}
        className={`btn__form`}
      />
    </form>
  );
};

export default FormInput;
