import React from "react";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [coins, setCoins] = React.useState([]);
  const [money, setMoney] = React.useState(0);
  const [many, setMany] = React.useState(0);

  let onChange = (event) => {
    setMoney(event.target.value);
  };

  let getPrice = (event) => {
    setMany(money / event.target.value);
  };

  React.useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Coins {coins.length}</h1>
      <input
        value={money}
        onChange={onChange}
        type="text"
        placeholder="money"
      />
      <span>USD</span>
      <hr />
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <div>
          <select onChange={getPrice}>
            {coins.map((coins) => (
              <option key={coins.id} value={coins.quotes.USD.price}>
                {coins.name}({coins.symbol}): ${coins.quotes.USD.price} USD
              </option>
            ))}
          </select>
        </div>
      )}
      <h1>you Can buy {many} coins</h1>
    </div>
  );
}

export default App;
