import axios from "axios";

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: "/api/transaction",
  headers: {
    "Content-type": "application/json",
  },
});
