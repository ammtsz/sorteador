import React, { useContext } from "react";
import { StatusContext } from "../../provider/status/status.provider";

const Button = ({ content, equalStarted, ...otherProps }) => {
  const { started } = useContext(StatusContext);

  return (
    <button
      type="submit"
      id="register-btn"
      className="registration__form--btn"
      disabled={equalStarted ? !started : started}
      {...otherProps}
    >
      {content}
    </button>
  );
};

export default Button;
