import React from "react";

export default function Filter({ filter, onChangeFilter }) {
  return (
    <input
      placeholder="Filtro"
      type="text"
      value={filter}
      onChange={onChangeFilter}
    />
  );
}
