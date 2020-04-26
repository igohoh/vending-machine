import React, { useState, useCallback } from "react";

import Wallet from "./components/Wallet";
import VendingMachine from "./components/VendingMachine";
import ChangeDispenser from "./components/ChangeDispenser";

const DEFAULT_COINS = {
  ones: 0,
  twos: 0,
  fives: 0,
  tens: 0,
};

const DEFAULT_CHANGE = {
  ones: 100,
  twos: 100,
  fives: 100,
  tens: 100,
};

const App = () => {
  //Номинал всех внесённых монет
  const [value, setValue] = useState(0);
  //Сдача в автомате
  const [change, setChange] = useState(DEFAULT_CHANGE);
  //Монеты, доступные для возврата в кошелёк
  const [takeable, setTakeable] = useState(DEFAULT_COINS);
  //Ошибки
  const [errorMessage, setErrorMessage] = useState("");

  const insertCoin = (name, coinValue) => {
    setChange((prevState) => ({ ...prevState, [name]: change[name] + 1 }));
    setValue(value + coinValue);
  };

  const giveChange = () => {
    const { ones, twos, fives, tens } = countChange();

    setChange((prevState) => ({
      ...prevState,
      ones: change.ones - ones,
      twos: change.twos - twos,
      fives: change.fives - fives,
      tens: change.tens - tens,
    }));
    setTakeable({ ones, twos, fives, tens });
    setValue(0);
  };

  const takeChange = useCallback(() => {
    setTakeable(DEFAULT_COINS);
  }, []);

  const countChange = () => {
    const tens = Math.floor(value / 10);
    const tensRemainder = value % 10;
    const fives = Math.floor(tensRemainder / 5);
    const fivesRemainder = tensRemainder % 5;
    const twos = Math.floor(fivesRemainder / 2);
    const ones = fivesRemainder % 2;

    return { ones, twos, fives, tens };
  };

  return (
    <div>
      <Wallet
        insertCoin={insertCoin}
        takeable={takeable}
        takeChange={takeChange}
        setErrorMessage={setErrorMessage}
      />
      <VendingMachine
        value={value}
        setValue={setValue}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <ChangeDispenser value={value} change={change} giveChange={giveChange} />
    </div>
  );
};

export default App;
