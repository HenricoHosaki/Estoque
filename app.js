const express = require('express');
const dotenv = require('dotenv');
const database = require('./src/database/database');
const setupRoutes = require ('./src/config/setupRoutes')
const apiUser = require('./src/api/user')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/v1/login/', apiUser.login);
app.use('/api/v1/', setupRoutes);

database.db
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Erro connecting in databank: ${err}`);
  });