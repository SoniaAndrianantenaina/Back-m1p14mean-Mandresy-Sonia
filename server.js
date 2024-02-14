const express=require('express');
const session = require('express-session');
const app = express();
const cors= require('cors');
var routes= require('./routes/route');
const mongoose = require('mongoose');
const config=require('./Config.js');
const url = 'mongodb://127.0.0.1:27017/'+config.db_name;

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



app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000);