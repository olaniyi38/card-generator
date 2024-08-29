import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  inverted?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, inverted, ...props }) => {
  return (
    <button {...props} className={`button ${inverted ? "button--inverted" : ""}`}>
      {children}
    </button>
  );
};

export default Button;
