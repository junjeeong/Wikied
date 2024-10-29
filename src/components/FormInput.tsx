import { FieldError,UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label?: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const FormInput = ({
  id,
  label,
  placeholder,
  error,
  register,
}: FormInputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-md">
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
          error ? "outline-red-200" : "outline-green-200"
        }`}
      ></input>
      {error && (
        <span className="text-xs text-red-200" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormInput;