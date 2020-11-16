import React, { useState } from "react";
import DecrementButton from "./DecrementButton.js";
import IncrementButton from "./IncrementButton.js";
import yearMonth from "../options.js"

export default function Period(props) {
  const [currentDate, setCurrentDate] = useState("2019-11");
  const [disabledIncrement, setDisabledIncrement] = useState(false);
  const [disabledDecrement, setDisabledDecrement] = useState(false);

  const handleOnChangeDate = (event) => {
    const { value } = event.target;
    let newDate = value;
    setCurrentDate(newDate);
  };

  const handleNextDate = (clickType) => {
    //pega o índice que está a data atual:
    let currentIndex = yearMonth.findIndex((obj) => obj.value === currentDate);

    //verifica se apertou > ou < e soma ou subtrai o index
    let nextIndex = clickType === ">" ? currentIndex + 1 : currentIndex - 1;
    console.log(nextIndex);

    let nextDate;

    if (nextIndex >= yearMonth.length) {
      nextDate = yearMonth[currentIndex];
      setDisabledIncrement(true);
    } else if(nextIndex < 0){
      nextDate = yearMonth[currentIndex];
      setDisabledDecrement(true);
    }
      else {
      setDisabledIncrement(false);
      setDisabledDecrement(false);
      //acha a posição referente ao index:
      nextDate = yearMonth[nextIndex];
      //mudar o valor no select:
      setCurrentDate(nextDate.value);
    }

  };

  return (
    <div>
      
      <DecrementButton onDecrement={handleNextDate} disabled={disabledDecrement}/>
      <div className="input-field col s6">
        <select
          value={currentDate}
          onChange={handleOnChangeDate}
          className="browser-default "
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
      <IncrementButton
        onIncrement={handleNextDate}
        disabled={disabledIncrement}
      />
    </div>
  );
}
