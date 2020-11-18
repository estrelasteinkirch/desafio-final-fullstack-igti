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
import css from "./css/style.module.css"

export default function Period() {
  const [currentDate, setCurrentDate] = useState("2021-02");
  const [disabledIncrement, setDisabledIncrement] = useState(false);
  const [disabledDecrement, setDisabledDecrement] = useState(false);
  const [transactionsPeriod, setTransactionsPeriod] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    const filterLowerCase = filter.toLowerCase();

    const filteredTransactions = transactionsPeriod.filter((t) => {
      return (
        t.category.toLowerCase().includes(filterLowerCase) ||
        t.description.toLowerCase().includes(filterLowerCase)
      );
    });

    setFilteredTransactions(filteredTransactions);
  }, [filter, transactionsPeriod]);

  useEffect(() => {
    getTransactions(currentDate);
    M.AutoInit();
  }, [currentDate]);

  const getTransactions = async (period) => {
    const response = await transactionsService.getPeriod(period);
    const allTransactions = response.data;
    setTransactionsPeriod(allTransactions);
    setFilteredTransactions(Object.assign([], allTransactions));
  };

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

  const handleModalNewOpen = () => {
    setIsModalNewOpen(true);
  };

  const handleClose = () => {
    setIsModalNewOpen(false);
    setIsModalEditOpen(false);
  };

  const handleCreate = async (formData) => {
    await transactionsService.create(formData);
    setIsModalNewOpen(false);
    await getTransactions(currentDate);

  };

  const handleDelete = async (id) => {
    await transactionsService.remove(id);
    await getTransactions(currentDate);
  };

  const handleEditData = async (_id, formData) => {
    await transactionsService.update(_id, formData);
    setIsModalEditOpen(false);
    await getTransactions(currentDate);
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalEditOpen(true);
  };

  return (
    <div className="container center">
      <Header
        disabledDecrement={disabledDecrement}
        disabledIncrement={disabledIncrement}
        onChangeDate={handleOnChangeDate}
        onNextDate={handleNextDate}
        date={currentDate}
      />
      <Panel transactions={filteredTransactions} />
      {isModalNewOpen && (
        <ModalNew onCreate={handleCreate} onClose={handleClose} />
      )}
      <div className={css.flexRow}>
        <button
          className={`${css.newButton} waves-effect btn teal lighten-1`}
          onClick={handleModalNewOpen}
        >
          + Novo lançamento
        </button>
        <Filter filter={filter} onChangeFilter={handleChangeFilter} />
      </div>
      <Transactions
        transactions={filteredTransactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {isModalEditOpen && (
        <ModalEdit
          onEdit={handleEditData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
