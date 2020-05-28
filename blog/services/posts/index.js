const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v4;
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts)
});

app.post('/posts', async (req, res) => {
  const id = uuid();
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: posts[id] });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  res.send({ success: true });
})

app.listen(4000, () => {
  console.log('posts service is listening on 4000');
});
