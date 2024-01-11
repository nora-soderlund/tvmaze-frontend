import { MouseEventHandler, ReactNode } from "react";
import "./IconButton.css";

type IconButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler;
}

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button className="icon-button" onClick={onClick}>
      {children}
    </button>
  )
};
