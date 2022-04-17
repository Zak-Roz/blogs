const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./app/routes/api');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/data', express.static('data'));
const mongoose = require('mongoose');

const config = require('./app/config/db.config'); 
const port = config.app.port;

const dbUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to zak-roz application.' });
});

app.use('/api', apiRouter);

app.listen(port, async() => {
  console.log(`🚀 Server is running on port http://localhost:${port}.`);
  try {
    await mongoose.connect(dbUrl, connectOptions);
    console.log('🚀 Mongo database connected');
    const { StatusUser } = require('./app/models');
    mongoose.connection.collections['status_u'].drop( function() {
      console.log('Collection dropped!');
    });
    await StatusUser.insertMany([
      { _id: 1, name: 'noactivity' },
      { _id: 2, name: 'active' },
      { _id: 3, name: 'rejection' },
    ]);
    fs.mkdirSync(`${__dirname}/data/thumbnail`, { recursive: true });
    console.log('StatusUser and Right done!');
  } catch(err) {
    console.log(err.toString());
  }
});