/* eslint-disable linebreak-style */
const electricity = require('../model/electricity');

const getInvoices = async (req, res) => {
  try {
    const response = await electricity.findAll();
    if (response) {
      res.send(response);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const getInvoiceById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await electricity.findById(id);
    if (response.length === 1) {
      res.send(response[0]);
    } else {
      res.status(404).json('Not Found');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const createInvoice = async (req, res) => {
  const invoice = {
    month: req.body.month,
    usage: req.body.usage,
    cost: req.body.cost,
  };
  try {
    const response = await electricity.save(invoice);
    if (response) {
      invoice.id = response.insertId;
      res.status(201).send(invoice);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateInvoice = async (req, res) => {
  const invoice = {
    id: req.body.id,
    month: req.body.month,
    usage: req.body.usage,
    cost: req.body.cost,
  };
  try {
    const response = await electricity.updateById(invoice);
    if (response) {
      res.send(invoice);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteInvoice = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await electricity.deleteById(id);
    if (response) {
      res.send('Invoice deleted');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
};
