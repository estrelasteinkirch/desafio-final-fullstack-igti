import React, { useEffect, useState } from "react";
import yearMonth from "../options.js";
import M from "materialize-css";
import Header from "./Header.js";
import transactionsService from "../services/transactionsService.js";
import Transactions from "./Transactions.js";
import Panel from "./Panel.js";
import Filter from "./Filter.js";
import ModalNew from "./ModalNew.js";
import ModalEdit from "./ModalEdit.js";

export default function Period() {
  const [currentDate, setCurrentDate] = useState("2020-07");
  const [disabledIncrement, setDisabledIncrement] = useState(false);
  const [disabledDecrement, setDisabledDecrement] = useState(false);
  const [transactionsPeriod, setTransactionsPeriod] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const filterLowerCase = filter.toLowerCase();
    const filteredTransactions = transactionsPeriod.filter((t) => {
      return t.description.includes(filterLowerCase);
    });
    setFilteredTransactions(filteredTransactions);
  }, [filter, transactionsPeriod]);

  useEffect(() => {
    const getTransactions = async (period) => {
      const response = await transactionsService.getPeriod(period);
      const allTransactions = response.data;
      setTransactionsPeriod(allTransactions);
      setFilteredTransactions(Object.assign([], allTransactions));
    };

    getTransactions(currentDate);
    M.AutoInit();
  }, [currentDate]);

  const handleChangeFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

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
    let nextDate;
    if (nextIndex >= yearMonth.length) {
      nextDate = yearMonth[currentIndex];
      setDisabledIncrement(true);
    } else if (nextIndex < 0) {
      nextDate = yearMonth[currentIndex];
      setDisabledDecrement(true);
    } else {
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
      <Header
        disabledDecrement={disabledDecrement}
        disabledIncrement={disabledIncrement}
        onChangeDate={handleOnChangeDate}
        onNextDate={handleNextDate}
        date={currentDate}
      />
      <Panel transactions={filteredTransactions} />
      <ModalNew />
      <Filter filter={filter} onChangeFilter={handleChangeFilter} />
      <Transactions transactions={filteredTransactions} />
      {/* <ModalEdit /> */}
    </div>
  );
}
