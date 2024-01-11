import { Fragment, ReactNode } from "react"
import PageHeader from "./PageHeader";

import "./Page.css";

type PageProps = {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="page">      
      {children}
    </div>
  );
};
