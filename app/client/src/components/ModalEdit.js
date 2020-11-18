import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalNew({ onClose, onEdit, selectedTransaction }) {
  const { type, _id } = selectedTransaction;

  const [description, setDescription] = useState(
    selectedTransaction.description
  );
  const [category, setCategory] = useState(selectedTransaction.category);
  const [value, setValue] = useState(selectedTransaction.value);
  const [date, setDate] = useState(selectedTransaction.yearMonthDay);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const parsedDate = new Date(date);
    const splitDate = date.split("-");

    const formData = {
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
    onEdit(_id, formData);
  };

  const handleValueChange = (event) => {
    setValue(+event.target.value);
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
        <div>
          <span>Inclusão de Lançamento</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              <input
                name="group1"
                type="radio"
                autoFocus
                checked={type === "-"}
                value="-"
                readOnly
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="group1"
                type="radio"
                value="+"
                checked={type === "+"}
                readOnly
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

          <div className="input-field">
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
              step="1"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <button
              className="wavez-effect waves-lights btn"
              // disabled={errorMessage.trim() !== ""}
            >
              Salvar
            </button>
            {/* <span style={styles.errorMessage}>{errorMessage}</span> */}
          </div>
        </form>
      </Modal>
    </div>
  );
}
