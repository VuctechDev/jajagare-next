import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  error?: boolean;
  register: UseFormRegister<T>;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  error = false,
  register,
}: InputFieldProps<T>) => {
  if (type === "date") {
    return (
      <input
        type="date"
        {...register(name, {
          required: true,
          setValueAs: (value: string) => {
            if (value) {
              const date = new Date(value);
              date?.setUTCHours(12, 0, 0, 0);
              return date?.toISOString();
            }
            return new Date().toISOString().split("T")[0];
          },
        })}
        className="px-4 py-3 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200 w-full"
        placeholder={label}
      />
    );
  }

  if (type === "textarea") {
    return (
      <textarea
        placeholder={label}
        {...register(name)}
        className="px-4 py-3  bg-white mb-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      />
    );
  }
  return (
    <>
      <input
        type={type}
        placeholder={label}
        {...register(name, { required: type !== "email" ? true : false })}
        className="px-4 py-3 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200 w-full"
      />
      {error && (
        <span className="text-red-500 text-[10px]">{`${label} je obavezno polje!`}</span>
      )}
    </>
  );
};

export default InputField;
