require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const express = require('express');

const sequelize = require('./database.js');

const app = express();

const routes = require('./routes/index.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/static', express.static(path.resolve('public')));
app.use(morgan('tiny'));

// ! UNION ROUTING SYSTEM
app.use('/api/v1', routes);

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

run();
