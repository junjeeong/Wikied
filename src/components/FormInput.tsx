import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label?: string;
  placeholder: string;
  type: string;
  error?: FieldError;
  submitError?: string;
  register: UseFormRegisterReturn;
  onChange?:() => void;
  
}

const FormInput = ({
  id,
  label,
  placeholder,
  type = "text",
  error,
  register,
  onChange,
  submitError,
}: FormInputProps) => {
  return (
    <div className="lex flex-col gap-2.5">
      {label && (
        <label htmlFor={id} className="text-md block mb-[10px]">
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        {...register}
        className={`w-full rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
          error ? "outline-red-200" : "outline-green-200"
        }`}
        onChange={onChange}
      ></input>
      {error && (
        <span className="text-xs text-red-200" role="alert">
          {error.message}
        </span>
      )}
      {submitError && (
        <span className="text-xs text-red-200" role="alert">
          {submitError}
        </span>
      )}
    </div>
  );
};

export default FormInput;
