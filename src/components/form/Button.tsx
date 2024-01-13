import { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}
