require('dotenv').config();
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let cors = require('cors');
let app = express();
const http = require('http').Server(app);

const Routes = require('./routes');

let options = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.userroot,
  password: process.env.passwordroot,
  database: process.env.database
};
let sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: false
}));
app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var lengthRoutes = Routes.length;

for (let i = 0; i < lengthRoutes; i++) {
  app.use(`/${Routes[i].Key}`, Routes[i].Route);
}

app.use(express.static('public'));

http.listen(process.env.listenport, () => {
  console.log(`Server started on http://localhost:${process.env.listenport}/`);
});

module.exports = app;