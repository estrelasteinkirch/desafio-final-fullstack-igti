import React, { useState } from "react";
import Modal from "react-modal";
import css from "./css/style.module.css";

Modal.setAppElement("#root");

export default function ModalNew({ onClose, onCreate }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("2021-02-16");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const parsedDate = new Date(date);
    const splitDate = date.split("-");

    const formData = {
      type,
      description,
      category,
      value,
      yearMonthDay: date,
      yearMonth: `${splitDate[0]}-${splitDate[1]}`,
      year: parsedDate.getFullYear(),
      month: parsedDate.getMonth() + 1,
      day: parsedDate.getDate(),
    };
    console.log(formData);
    onCreate(formData);
  };

  const handleValueChange = (event) => {
    setValue(+event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div>
      <Modal style={{ overlay: { zIndex: 1000 } }} isOpen={true}>
        <div className={css.header}>
          <span className={css.title}>Inclusão de Lançamento</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "30px" }}>
            <label>
              <input
                name="group1"
                type="radio"
                autoFocus
                checked={type === "-"}
                value="-"
                onChange={handleTypeChange}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="group1"
                type="radio"
                value="+"
                checked={type === "+"}
                onChange={handleTypeChange}
              />

              <span>Receita</span>
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={category}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria
            </label>
          </div>

          <div className={`${css.flexRow} input-field`}>
            <input
              id="inputValue"
              type="number"
              value={value}
              step="1"
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor
            </label>
            <input
              id="inputDate"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          <div className={css.flexRow}>
            <button className="wavez-effect waves-lights btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
