const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.get('/events', (req, res) => {
  res.send(events);
});

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts_clusterip-srv:4000/events', event);
  axios.post('http://comments_clusterip-srv:4001/events', event);
  axios.post('http://query_clusterip-srv:4002/events', event);
  axios.post('http://moderation_clusterip-srv:4003/events', event);

  res.send({ success: true });
});

app.listen(4005, () => {
  console.log('Event bus listening on 4005')
});