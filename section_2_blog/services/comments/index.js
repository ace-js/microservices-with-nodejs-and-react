const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v4;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostID[id];
  
  return comments ? res.send(comments) : res.status(404).send();
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = uuid();
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostID[id] || [];
  comments.push({
    id: commentId,
    content
  });

  commentsByPostID[id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('comments service is listening on 4001');
});
