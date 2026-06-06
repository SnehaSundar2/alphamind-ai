interface Props {
  symbol: string;
  price: string;
}

export default function StockCard({
  symbol,
  price,
}: Props) {
  return (
    <div className="card">
      <h3>{symbol}</h3>
      <h2>{price}</h2>
    </div>
  );
}