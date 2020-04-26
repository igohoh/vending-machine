import React from "react";

const ChangeDispenser = ({ value, change, giveChange }) => {
  const { ones, twos, fives, tens } = change;
  return (
    <div>
      <div>
        <strong>Кошелёк VM:</strong>
        <ul>
          <li>1 рубль: {ones} шт.</li>
          <li>2 рубля: {twos} шт.</li>
          <li>5 рублей: {fives} шт.</li>
          <li>10 рублей: {tens} шт.</li>
        </ul>
      </div>
      <div>
        <strong>Внесенная сумма:</strong>
        <span> {value} рублей </span>
        <span>
          <button onClick={giveChange} disabled={value === 0}>
            Сдача
          </button>
        </span>
      </div>
    </div>
  );
};

export default ChangeDispenser;
