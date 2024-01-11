import { ReactNode } from "react";

import "./PageContainer.css";

type PageContainerProps = {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="page-container">
      {children}
    </div>
  );
}
