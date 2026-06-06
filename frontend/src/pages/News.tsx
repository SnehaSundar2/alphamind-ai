export default function News() {
  const news = [
    {
      title: "TCS wins $500M global contract",
      sentiment: "Positive",
    },
    {
      title: "Reliance expands retail business",
      sentiment: "Positive",
    },
    {
      title: "Infosys announces new AI platform",
      sentiment: "Bullish",
    },
  ];

  return (
    <div>
      <h1>Market News</h1>

      <div className="cards">
        {news.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.sentiment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}