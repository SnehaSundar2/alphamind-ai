interface Props {
  title: string;
  value: string;
}

export default function PortfolioCard({
  title,
  value,
}: Props) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}