import { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="button">
      {children}
    </button>
  )
}
