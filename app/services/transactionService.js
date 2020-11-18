import mongoose from "mongoose";
import { TransactionModel } from "../models/TransactionModel.js";
const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
  try {
    const transactions = new TransactionModel(req.body);
    await transactions.save();

    res.send({
      message: "Transação inserida com sucesso inserido com sucesso",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const findAll = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({});
    res.send(transactions);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const filter = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const nameFinded = await TransactionModel.find(condition);

    res.send(nameFinded);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const findPeriod = async (req, res) => {
  const period = req.query.period;

  try {
    const transactions = await TransactionModel.find({
      yearMonth: period,
    }).sort({ day: 1 });

    if (!period) {
      return res.status(400).send({
        message:
          'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
      });
    }
    res.send(transactions);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const findYear = async (req, res) => {
  const year = req.query.period;

  try {
    if (!year) {
      return res.status(400).send({
        message: 'É necessário informar o parâmetro "year"',
      });
    }

    const positiveTransactions = await TransactionModel.find({
      year: year,
      type: "+",
    });

    let incomeTotal = positiveTransactions.reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);

    const negativeTransactions = await TransactionModel.find({
      year: year,
      type: "-",
    });

    let expensesTotal = negativeTransactions.reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);

    const yearBalance = incomeTotal - expensesTotal;

    res.send(`O saldo total do ano de ${year} foi de R$ ${yearBalance}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Transação id:" + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete({ _id: id });

    if (!transaction) {
      res.status(400).send("Transação não encontradoa na Coleção");
    } else {
      res.status(200).send("Transação deletada com sucesso!");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar a Transação id: " + id });
  }
};

const removeAll = async (req, res) => {
  try {
    await TransactionModel.deleteMany({});
    res.status(200).send("Transações deletadas com sucesso!");
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todas as transações" });
  }
};

export default {
  create,
  filter,
  findAll,
  findYear,
  findPeriod,
  update,
  remove,
  removeAll,
};
