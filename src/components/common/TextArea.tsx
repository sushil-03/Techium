import React from "react";

export const TextArea = ({
  label,
  placeholderText = "",
  icon,
  required = true,
  error,
  name,
  register,
  ...options
}: {
  label: string;
  name: string;
  register: any;
  placeholderText?: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  // options?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  // For styling label with bracket
  const regrex = /\([^)]*\)/g;
  const labelName = label.replace(regrex, "");
  const labelBracketText = label.match(regrex);
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-sm tracking-wide font-gt-walsheim-light placeholder:font-gt-walsheim-light">
          <span className="text-brand-snow ">{labelName}</span>
          <span className="text-[#C1C1C1]">{labelBracketText}</span>
        </label>
      )}

      <div className="flex ">
        <textarea
          {...register(name, {
            required: {
              value: true,
              message: `${label} is required`,
            },
          })}
          rows={6}
          className={`px-2 ${
            error ? "border-red-600 " : "border-brand-snow"
          }  rounded-[10px] w-full py-3 text-base border outline-none resize-none focus:border-primary font-gt-walsheim-regular text-primary placeholder:text-brand-snow placeholder:font-gt-walsheim-light`}
          placeholder={placeholderText}
          // required
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-gt-walsheim-regular">{error}</p>
      )}
    </div>
  );
};
