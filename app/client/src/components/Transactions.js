import React from "react";
import Transaction from "./Transaction";

export default function Transactions({ transactions, onDelete, onEdit }) {
  return (
    <table>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </tbody>
    </table>
  );
}
