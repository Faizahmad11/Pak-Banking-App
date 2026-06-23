import React from "react";
import clsx from "clsx";
import { CgSpinner } from "react-icons/cg";

const CustomAuthButton = ({
  isLoading = false,
  className = "",
  type = "submit",
  text,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      {...props}
      className={clsx(
        `
        w-full
        py-4
        rounded-xl
        font-semibold
        text-white
        flex
        items-center
        justify-center
        gap-3
        bg-gradient-to-r
        from-cyan-500
        via-sky-500
        to-blue-600
        shadow-lg
        shadow-cyan-500/20
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-cyan-500/40
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:scale-100
        `,
        className
      )}
    >
      {isLoading ? (
        <>
          <CgSpinner className="animate-spin text-xl" />
          <span>Creating Account...</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default CustomAuthButton;