import React from "react";
type DefaultSearchProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const SearchInput = ({
  type = "text",
  iconPosition = "left",
  placeholderText = "",
  icon,
  className,
  onChange,
  ...options
}: {
  type?: "text" | "number" | "email" | "password";
  placeholderText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  options?: DefaultSearchProps;
}) => {
  // For styling label with bracket

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative ">
        <input
          className={`flex px-2 border border-brand-snow   rounded-lg w-full h-12 text-base focus:border-brand-snow outline-none font-gt-walsheim-regular text-primary placeholder:text-brand-snow placeholder:font-gt-walsheim-light ${
            icon && (iconPosition === "left" ? "pl-10 " : "pr-10 ")
          } ${className}`}
          placeholder={placeholderText}
          {...options}
          onChange={onChange}
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
    </div>
  );
};
