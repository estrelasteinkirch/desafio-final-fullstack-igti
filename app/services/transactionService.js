import mongoose from "mongoose";
import { TransactionModel } from "../models/TransactionModel.js";
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel').default;

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

const findPeriod = async (req, res) => {
  const period = req.query.period;

  try {
    const transactions = await TransactionModel.find({ yearMonth: period });

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

export default { create, findAll, findPeriod, update, remove, removeAll };
