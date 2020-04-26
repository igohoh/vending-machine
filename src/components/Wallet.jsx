import React, { useState, useEffect } from "react";

const DEFAULT_WALLET = {
  ones: 10,
  twos: 30,
  fives: 20,
  tens: 15,
};

const Wallet = ({ insertCoin, takeable, takeChange, setErrorMessage }) => {
  const [wallet, setWallet] = useState(DEFAULT_WALLET);

  useEffect(() => {
    const { ones, twos, fives, tens } = takeable;
    const { ones: wOnes, twos: wTwos, fives: wFives, tens: wTens } = wallet;
    if (ones || twos || fives || tens) {
      setWallet((prevState) => ({
        ...prevState,
        ones: wOnes + ones,
        twos: wTwos + twos,
        fives: wFives + fives,
        tens: wTens + tens,
      }));
      takeChange();
    }
    return;
  }, [takeable, takeChange, wallet, setWallet]);

  const handleClick = async (event) => {
    const { name } = event.target;
    setWallet((prevState) => ({ ...prevState, [name]: wallet[name] - 1 }));
    switch (name) {
      case "ones":
        insertCoin(name, 1);
        break;
      case "twos":
        insertCoin(name, 2);
        break;
      case "fives":
        insertCoin(name, 5);
        break;
      case "tens":
        insertCoin(name, 10);
        break;
      default:
        return;
    }
    setErrorMessage("");
  };

  return (
    <div className="wallet">
      <div>
        <label>
          <strong>Ваш кошелёк:</strong>
        </label>
      </div>
      <div>
        <ul>
          <li>
            <button
              name="ones"
              onClick={handleClick}
              disabled={wallet.ones === 0}
            >
              Внести
            </button>
            <label> 1 Рубль. Осталось: {wallet.ones} шт.</label>
          </li>
          <li>
            <button
              name="twos"
              onClick={handleClick}
              disabled={wallet.twos === 0}
            >
              Внести
            </button>
            <label> 2 Рубля. Осталось: {wallet.twos} шт.</label>
          </li>
          <li>
            <button
              name="fives"
              onClick={handleClick}
              disabled={wallet.fives === 0}
            >
              Внести
            </button>
            <label> 5 Рублей. Осталось: {wallet.fives} шт.</label>
          </li>
          <li>
            <button
              name="tens"
              onClick={handleClick}
              disabled={wallet.tens === 0}
            >
              Внести
            </button>
            <label> 10 Рублей. Осталось: {wallet.tens} шт.</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
