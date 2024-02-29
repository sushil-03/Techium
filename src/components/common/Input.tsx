import React from "react";

export const Input = ({
  label,
  type = "text",
  iconPosition = "left",
  placeholderText = "",
  icon,
  name,
  required = true,
  disabled = false,
  error,
  className,
  register,
  otherValidation = {},
  ...options
}: {
  label: string;
  name?: string;
  register: Function;
  type?: "text" | "number" | "email" | "password";
  placeholderText?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  required?: boolean;
  error?: string;
  className?: string;
  otherValidation?: any;
  options?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  // For styling label with bracket

  const regrex = /\([^)]*\)/g;
  const labelName = label.replace(regrex, "");
  const labelBracketText = label.match(regrex);
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-sm tracking-wide font-gt-walsheim-light placeholder:font-gt-walsheim-light">
          <span className="text-brand-snow">{labelName}</span>
          <span className="text-[#C1C1C1]">{labelBracketText}</span>
        </label>
      )}
      <div className="relative ">
        <input
          className={`flex px-2 border    rounded-lg w-full h-12 text-base focus:border-brand-snow outline-none font-gt-walsheim-regular text-primary placeholder:text-brand-snow placeholder:font-gt-walsheim-light ${
            error
              ? "border-red-600"
              : "border-brand-snow disabled:bg-gray-300 disabled:cursor-not-allowed"
          } ${
            icon && (iconPosition === "left" ? "pl-10 " : "pr-10 ")
          } ${className}`}
          placeholder={placeholderText}
          // required
          {...register(name, {
            required: {
              value: required,
              message: `${name} is required`,
            },
            // pattern: {
            //   value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            //   message: "Invalid Email",
            // },
            pattern: otherValidation.pattern,
          })}
          disabled={disabled}
          {...options}
        />
        {icon && (
          <div
            className={`absolute ${
              iconPosition === "left" ? "left-2" : "right-2"
            } top-3`}
          >
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 font-gt-walsheim-regular">{error}</p>
      )}
    </div>
  );
};
