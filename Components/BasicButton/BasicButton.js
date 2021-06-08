import { ComponentProps, forwardRef } from "react";

export const BasicButton = forwardRef(
  ({ onClick, title, disabled, styleColor = "primary" }, ref) => (
    <button
      className={`basic-button ${styleColor}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
      ref={ref}
    >
      {title}
    </button>
  )
);
