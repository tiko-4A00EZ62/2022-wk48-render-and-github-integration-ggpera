/* eslint-disable linebreak-style */
const express = require('express');
const electricityRouter = require('./routes/electricity');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api/electricity', electricityRouter);

module.exports = app;
