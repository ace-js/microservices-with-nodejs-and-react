const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fakeDb = {};
const handleEvent = require('./lib/handleEvent')(fakeDb);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(fakeDb);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ success: true });
})

app.listen(4002, async () => {
  console.log('Query listening on 4002')
  eventSync();
})

const eventSync = async () => {
  // get all stored event and handle them to be synchronized (simple way with duplication risks)
  const res = await axios.get('http://localhost:4005/events');
  res.data.forEach(event => {
    handleEvent(event.type, event.data);
  });
}