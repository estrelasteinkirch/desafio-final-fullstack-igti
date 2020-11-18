import React from "react";
import css from "./css/style.module.css";
import formatMoney from "../helpers/format";

export default function Panel({ transactions }) {
  const numberTransactions = transactions.length;
  const totalIncome = transactions
    .filter((t) => t.type === "+")
    .reduce((acc, transaction) => acc + transaction.value, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "-")
    .reduce((acc, transaction) => acc + transaction.value, 0);

  const balance = totalIncome - totalExpenses;

  const c = balance >= 0 ? "positive" : "negative";

  return (
    <div className={css.panelRow}>
      <p>
        Lançamentos: <span>{numberTransactions}</span>
      </p>
      <p>
        Receitas: <span className={css.income}>{formatMoney(totalIncome)}</span>
      </p>
      <p>
        Despesas: <span className={css.expense}>{formatMoney(totalExpenses)}</span>
      </p>
      <p>
        Saldo:<span className={`${css.balance} ${css[c]}`}>{formatMoney(balance)}</span>{" "}
      </p>
    </div>
  );
}
