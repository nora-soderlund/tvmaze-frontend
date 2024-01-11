import { FormEventHandler } from "react";
import "./Input.css";

type InputProps = {
  placeholder?: string;
  onChange: FormEventHandler<HTMLInputElement>;
}

export default function Input({ onChange, placeholder }: InputProps) {
  return (
    <input className="input" type="text" placeholder={placeholder} onChange={onChange}/>
  );
}
