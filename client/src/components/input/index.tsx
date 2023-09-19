import { FC, InputHTMLAttributes } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  name: string;
  className?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  label,
  className = "",
  required = false,
  ...rest
}) => {
  return (
    <div className={`d-flex flex-column gap-2 ${className}`}>
      <label className="cursor-pointer" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input className="form-control" id={name} name={name} {...rest} />
    </div>
  );
};

export default Input;
