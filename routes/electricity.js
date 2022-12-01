/* eslint-disable linebreak-style */
const express = require('express');
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require('../controller/electricity');

const router = express.Router();

router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.post('/', createInvoice);
router.put('/', updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
