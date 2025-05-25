import React from "react";

import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Add more variants as needed
  // className is part of React.ButtonHTMLAttributes
  // disabled is part of React.ButtonHTMLAttributes
  // type is part of React.ButtonHTMLAttributes
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  disabled,
  type = "button",
  ...rest
}) => {
  const baseStyles =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-150 ease-in-out";

  const variantStyles = {
    primary:
      "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600",

    secondary:
      "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500 dark:text-indigo-300 dark:bg-gray-700 dark:hover:bg-gray-600",
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className // Allows for additional custom classes or overrides
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
