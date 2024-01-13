import "./LoadingDots.css";

type LoadingDotsProps = {
  "data-testid"?: string;
}

export default function LoadingDots({ "data-testid": dataTestId }: LoadingDotsProps) {
  return (
    <div className="loading-dots" title="Loading" data-testid={dataTestId}>
      <div className="loading-dots-item"/>
      <div className="loading-dots-item"/>
      <div className="loading-dots-item"/>
    </div>
  );
}
