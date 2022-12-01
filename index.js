/* eslint-disable linebreak-style */
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend is listening on port ${PORT}`);
});
