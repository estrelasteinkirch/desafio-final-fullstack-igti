import React from "react";

export default function Filter({ filter, onChangeFilter }) {
  return (
    <div>
      <input
        placeholder="Filtro"
        type="text"
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
}
