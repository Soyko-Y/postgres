// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./queries');

// const app = express();
// const port = 3000;

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

// app.get('/users', db.getUsers);
// app.get('/users/:id', db.getUserById);
// app.post('/users', db.createUser);
// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`);
// });

import express from 'express';
import bodyParser from'body-parser';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

require('./routes/news.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}.`);
});
