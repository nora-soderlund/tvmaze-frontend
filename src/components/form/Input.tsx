import { FormEventHandler } from "react";
import "./Input.css";

type InputProps = {
  placeholder?: string;
  onChange: FormEventHandler<HTMLInputElement>;
  "data-testid"?: string;
}

export default function Input({ onChange, placeholder, "data-testid": dataTestId }: InputProps) {
  return (
    <input className="input" type="text" placeholder={placeholder} onChange={onChange} data-testid={dataTestId}/>
  );
}
