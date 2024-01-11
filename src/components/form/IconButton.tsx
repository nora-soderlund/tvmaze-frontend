import { MouseEventHandler, ReactNode } from "react";
import "./IconButton.css";

type IconButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler;
  "data-testid"?: string;
}

export default function IconButton({ children, onClick, "data-testid": dataTestId }: IconButtonProps) {
  return (
    <button className="icon-button" onClick={onClick} data-testid={dataTestId}>
      {children}
    </button>
  )
};
