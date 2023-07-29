require('dotenv').config();
let express = require('express');

let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
const circularJSON = require('circular-json');
let cors = require('cors');
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var event = require("events");
const eventEmitter = new event.EventEmitter();
eventEmitter.setMaxListeners(150);
let length = 0;
let data = [];

var kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient('127.0.0.1:9092'),
  KeyedMessage = kafka.KeyedMessage,
  Admin = kafka.Admin,
  Producer = kafka.Producer,
  producer = new Producer(client);

var consumer = new Consumer(
  client,
  [
    { topic: 'invoice', partition: 0 }
  ],
  {
    autoCommit: false
  }
);

const {
  userRoutes, settingRoutes, uploadRoutes, verifyRoutes,
  social_settingRotes, roadmapRoutes, submitRoutes,
  productRoutes, invoiceRoutes
} = require('./routes');

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

// console.log(consumer);

consumer.on('message', function (message) {
  console.log(data);
  data = [...data, message.value];
  eventEmitter.emit("trigger");
  // console.log(data);
});

const Log = async (req, res, next) => {
  try {
    payloads = [
      { topic: 'invoice', messages: circularJSON.stringify(req.bodyParser), key: 'xxx' },
    ];
    producer.send(payloads, function (err, data) {
      console.log(data);
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const GetLog = async (req, res, next) => {
  res.status(200).json({
    status: "Ok!",
    data: data[4]
  });
};
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get("/log", GetLog);
app.use(Log);
app.use("/users",userRoutes);
app.use("/settings", settingRoutes);
app.use("/uploads", uploadRoutes);
app.use("/verify", verifyRoutes);
app.use("/socialSettings", social_settingRotes);
app.use("/roadmaps", roadmapRoutes);
app.use("/submits", submitRoutes);
app.use("/products", productRoutes);
app.use("/invoices", invoiceRoutes);

app.use(express.static('public'));
// const server = app.listen(process.env.listenport, () => {
//   console.log("Server started on http://localhost:" + process.env.listenport);
// })



io.on("connection", (socket) => {
  console.log('connect');
  // socket.on('chat message', msg => {
  //   console.log(msg, data.length);
  //   io.emit('chat message', data.length);
  // });

  io.sockets.emit('chat message', { data: data });

  eventEmitter.on("trigger", () => {
    io.sockets.emit('chat message', { data: data })
  });
});

http.listen(process.env.listenport, () => {
  console.log(`Server started on http://localhost:${process.env.listenport}/`);
});

module.exports = app;