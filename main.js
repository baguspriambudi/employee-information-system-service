/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const PORT = process.env.PORT || 2000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', expbs({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'));

// mongodb connections
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  const date = new Date();
  res.render('home', {
    title: 'Home Page',
    message: 'Hi, Selamat Datang Silahkan Pilih Menu Di Pojok Kanan Atas',
    timestamp: date,
  });
});

// routes API
const routeApiV1 = express.Router();
routeApiV1.use('/salary', require('./routes/salary_route'));
routeApiV1.use('/employee', require('./routes/employee_route'));

app.use('/api/v1', routeApiV1);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 400;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
});

app.listen(PORT, console.log(`listening to PORT ${PORT}`));

module.exports = app;
