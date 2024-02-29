import React, { FC, ReactNode } from "react";
type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  className,
  variant = "primary",
  onClick,
  icon,
  ...buttonProps
}) => {
  const fullStyleWidth = fullWidth ? "w-full" : "";

  // For handling different button styles
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "py-3  bg-primary dark:text-textColor-dark text-textColor-light rounded-full px-10 ";
      }
      case "secondary": {
        return "border border-primary px-5 py-2 text-primary rounded-lg hover:bg-primary hover:text-white shadow-sm";
      }
      case "tertiary": {
        return "";
      }
      default: {
        return "";
      }
    }
  };
  return (
    <button
      className={`${getVariant()} font-gt-walsheim-regular whitespace-nowrap transition-all ease-in-out duration-700 dark:text-textColor-dark text-textColor-light  ${fullStyleWidth}  ${className} `}
      onClick={onClick}
      {...buttonProps}
    >
      <div className="flex items-center justify-center">
        {children}
        {icon && <div className="inline-block ml-2">{icon}</div>}
      </div>
    </button>
  );
};

export default Button;
