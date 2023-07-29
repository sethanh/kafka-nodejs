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
let { sendOk, sendErr } = require('./components')
var event = require("events");
const eventEmitter = new event.EventEmitter();
eventEmitter.setMaxListeners(150);
let length = 0;

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
    { topic: 'product', partition: 0 }
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

let clients = [];
let invoices = {};

function eventsHandler(request, response, next) {
  const { params } = request;
  const { id } = params;
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${circularJSON.stringify(invoices[id])}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
    user_id: id
  };

  clients.push(newClient);

  console.log(clients);


  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

function sendEventsToAll(newFact, key) {
  var clientSends = clients.filter(c => c.user_id == key);
  clientSends.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

async function addFact(request, respsonse, next) {
  const newFact = request.body;
  invoices.push(newFact);
  respsonse.json(newFact)
  return sendEventsToAll(newFact);
}

async function addInvocie(invoice, key) {
  if (invoices[key]) {
    invoices[key] = [...invoices[key],invoice];
  }
  else
  {
    invoices[key]= [invoice];
  }
  return sendEventsToAll(invoices[key], key);
}

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

consumer.on('message', function (message) {
  addInvocie(message.value, message.key);
  console.log(invoices);
});

const Log = async (req, res, next) => {
  try {
    const { body, resData } = req;
    const { user_id } = body;
    payloads = [
      { topic: 'product', messages: circularJSON.stringify(resData), key: user_id },
    ];
    producer.send(payloads, function (err, data) {
      console.log(data);
    });
    return sendOk({
        res,
        status: 200,
        message: 'Tạo hoá đơn thành công',
        data: resData,
        error: false
    });
  } catch (error) {
    console.log(error);
  }
};

const GetLog = async (req, res, next) => {
  // console.log('xxx', data);
  // var reqs = [];
  // for(let i = 4 ; i<data.length; i++)
  // {
  //   reqs = [...reqs, circularJSON.parse(data[i])];
  // }
  res.status(200).json({
    status: "Ok!",
    data: data[4]
  });
};
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get("/log", GetLog);
app.get('/events/:id', eventsHandler);
app.post('/fact', addFact);
app.use("/users", userRoutes);
app.use("/settings", settingRoutes);
app.use("/uploads", uploadRoutes);
app.use("/verify", verifyRoutes);
app.use("/socialSettings", social_settingRotes);
app.use("/roadmaps", roadmapRoutes);
app.use("/submits", submitRoutes);
app.use("/products", productRoutes);
app.use("/invoices", invoiceRoutes, Log);

app.use(express.static('public'));

http.listen(process.env.listenport, () => {
  console.log(`Server started on http://localhost:${process.env.listenport}/`);
});

module.exports = app;