import { ReactNode } from "react";
import "./PageMain.css";

type PageMainProps = {
  children: ReactNode;
}

export default function PageMain({ children }: PageMainProps) {
  return (
    <main className="page-main">
      {children}
    </main>
  );
}
