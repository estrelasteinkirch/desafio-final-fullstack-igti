import React from "react";
import DecrementButton from "./DecrementButton";
import IncrementButton from "./IncrementButton";
import yearMonth from "../options.js";

export default function Header({
  date,
  disabledDecrement,
  disabledIncrement,
  onNextDate,
  onChangeDate,
}) {
  return (
    <div>
      <DecrementButton onDecrement={onNextDate} disabled={disabledDecrement} />
      <div className="input-field col s12">
        <select
          value={date}
          onChange={onChangeDate}
          // className="browser-default "
        >
          {yearMonth.map(({ value, display }, index) => {
            return (
              <option key={index} value={value} posicao={index + 1}>
                {display}
              </option>
            );
          })}
        </select>
      </div>
      <IncrementButton onIncrement={onNextDate} disabled={disabledIncrement} />
    </div>
  );
}
