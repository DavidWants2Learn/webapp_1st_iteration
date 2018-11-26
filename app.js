const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'epm',
  password: 'Hydroxide2',
  server: 'epm490.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'Estate_Planning_Mom_490',

  options: {
    encrypt: true
  }
};
sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/services', title: 'Services' },
  { link: '/resources', title: 'Resources' },
  { link: '/products', title: 'Products' },
  { link: '/signup', title: 'Sign Up' }
];

const serviceRouter = require('./src/routes/serviceRoutes')(nav);
const signupRouter = require('./src/routes/signupRoutes')(nav);
// const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/services', serviceRouter);
app.use('/signup', signupRouter);
// app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/services', title: 'Services' },
        { link: '/resources', title: 'Resources' },
        { link: '/products', title: 'Products' },
        { link: '/signup', title: 'Sign Up' }]
    }
  );
});

app.listen(port, () => {
  debug(`Listening to port ${chalk.green(port)}`);
});
