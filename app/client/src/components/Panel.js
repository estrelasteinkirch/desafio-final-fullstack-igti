import React from "react";

export default function Panel({ transactions }) {
  const numberTransactions = transactions.length;
  const totalIncome = transactions
    .filter((t) => t.type === "+")
    .reduce((acc, transaction) => acc + transaction.value, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "-")
    .reduce((acc, transaction) => acc + transaction.value, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <span>Lançamentos: {numberTransactions}</span>
      <span>Receitas: {totalIncome}</span>
      <span>Despesas: {totalExpenses}</span>
      <span>Saldo: {balance}</span>
    </div>
  );
}
