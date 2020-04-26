import React, { useState } from "react";

const DEFAULT_STOCK = {
  tea: 10,
  blackCoffe: 20,
  whiteCoffe: 20,
  juice: 15,
};

const PRICES = {
  tea: 13,
  blackCoffe: 18,
  whiteCoffe: 21,
  juice: 35,
};

const VendingMachine = ({ value, setValue, errorMessage, setErrorMessage }) => {
  const [stock, setStock] = useState(DEFAULT_STOCK);

  const handleClick = (event) => {
    const { name } = event.target;
    if (value < PRICES[name]) {
      setErrorMessage("Недостаточно средств");
      return;
    }
    setErrorMessage("");
    setStock((prevState) => ({ ...prevState, [name]: stock[name] - 1 }));
    setValue(value - PRICES[name]);
  };

  return (
    <div className="vendingMachine">
      <div className="stock">
        <strong>Выберите напиток:</strong>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <ul>
          <li className="tea">
            <button name="tea" onClick={handleClick} disabled={stock.tea === 0}>
              Заказать
            </button>
            <label>
              <span role="img" aria-label="tea">
                🍵
              </span>
              Чай. {PRICES.tea} рублей. Порций: {stock.tea}
            </label>
          </li>
          <li className="blackCoffe">
            <button
              name="blackCoffe"
              onClick={handleClick}
              disabled={stock.blackCoffe === 0}
            >
              Заказать
            </button>
            <label>
              <span role="img" aria-label="blackCoffe">
                ☕
              </span>
              Кофе. {PRICES.blackCoffe} рублей. Порций: {stock.blackCoffe}
            </label>
          </li>
          <li className="whiteCoffe">
            <button
              name="whiteCoffe"
              onClick={handleClick}
              disabled={stock.whiteCoffe === 0}
            >
              Заказать
            </button>
            <label>
              <span role="img" aria-label="whiteCoffe">
                ☕🥛
              </span>
              Кофе с молоком. {PRICES.whiteCoffe} рубль. Порций:{" "}
              {stock.whiteCoffe}
            </label>
          </li>
          <li className="juice">
            <button
              name="juice"
              onClick={handleClick}
              disabled={stock.juice === 0}
            >
              Заказать
            </button>
            <label>
              <span role="img" aria-label="whiteCoffe">
                🍹
              </span>
              Сок. {PRICES.juice} рублей. Порций: {stock.juice}
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendingMachine;
