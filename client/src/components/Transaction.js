import React from "react";
import Action from "./Action";
import css from "./css/style.module.css";
import formatMoney from "../helpers/format";

export default function Transaction({ transaction, onDelete, onEdit }) {
  const { _id, day, category, description, value, type } = transaction;

  let dayD = day.toString().padStart(2, "0");

  const handleActionClick = (type) => {
    if (type === "delete") {
      onDelete(_id);
      return;
    }
    onEdit(transaction);
  };

  const styleType =
    type === "+" ? "card-panel teal lighten-3" : "card-panel red lighten-3";

  return (
    <tr className={styleType}>
      <td
        style={{ fontSize: "1.8rem", fontWeight: "bold", textAlign: "center" }}
      >
        {dayD}
      </td>

      <td className={css.tdd}>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{category}</p>
        <p>{description}</p>
      </td>

      <td
        style={{ fontSize: "1.4rem", fontWeight: "bold", textAlign: "center" }}
      >
        {formatMoney(value)}
      </td>
      <td>
        <Action onActionClick={handleActionClick} type="edit" />
      </td>
      <td>
        <Action onActionClick={handleActionClick} type="delete" />
      </td>
    </tr>
  );
}
