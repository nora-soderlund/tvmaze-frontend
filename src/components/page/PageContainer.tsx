import { ReactNode } from "react";

import "./PageContainer.css";

type PageContainerProps = {
  children: ReactNode;
  "data-testid"?: string;
}

export default function PageContainer({ children, "data-testid": dataTestId }: PageContainerProps) {
  return (
    <div className="page-container" data-testid={dataTestId}>
      {children}
    </div>
  );
}
