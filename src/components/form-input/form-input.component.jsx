import React from "react";
import Button from "../button/button.component"

const FormInput = ({equalStarted, handleSubmit, setData, btnContent, ...otherProps}) => {

    const handleChange = (event) => {
        setData(event.target.value);
      };

  return (
      <form
        className="registration__form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          type="text"
          autoComplete="off"
          onChange={(event) => {handleChange(event)}}
          {...otherProps}
        />

        <Button content={btnContent} equalStarted={equalStarted}/>
      </form>
      );
    };
    
    export default FormInput;