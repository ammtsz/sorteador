import React, { useContext } from "react";
import "./button.styles.scss"

import { StatusContext } from "../../provider/status/status.provider";

const Button = ({ content, equalStarted, ...otherProps }) => {
  const { started } = useContext(StatusContext);

  return (
    <button
      type="submit"
      id="register-btn"
      disabled={equalStarted ? !started : started}
      {...otherProps}
    >
      {content}
    </button>
  );
};

export default Button;
