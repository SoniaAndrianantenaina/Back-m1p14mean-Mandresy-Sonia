const express=require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors= require('cors');
var routes= require('./routes/route');
const mongoose = require('mongoose');
const config=require('./Config.js');
const url = config.db_url+config.db_name;
const crontTasks = require('./src/envoie_notif.js');

app.use(session({
  secret: 'MaCléSecrète123!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.use_https } // Remplacez false par true si vous utilisez HTTPS
}));


mongoose.connect(url)
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000);