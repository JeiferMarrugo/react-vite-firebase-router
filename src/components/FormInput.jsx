import { forwardRef } from "react";
const FormInput = forwardRef(
  ({ children, type, placeholder, onChange, onBlur, name }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        {children}
      </>
    );
  }
);
export default FormInput;
