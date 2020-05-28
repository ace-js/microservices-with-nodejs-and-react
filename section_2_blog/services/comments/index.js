const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v4;
const eventDispatcher = require('./lib/eventDispatcher');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostID[id] || [];

  res.send(comments);
});

app.post('/posts/:postId/comments', async (req, res) => {
  const id = uuid();
  const { content } = req.body;
  const { postId } = req.params;

  if (!commentsByPostID[postId]) {
    return res.status(400).send();
  }

  const comment = {
    id,
    content,
    status: 'pending'
  };

  commentsByPostID[postId].push(comment)

  await eventDispatcher('CommentCreated', { comment, postId });

  res.status(201).send(commentsByPostID[postId]);
});


app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'PostCreated':
      commentsByPostID[data.id] = [];
      break;

    case 'CommentModerated':
      const comment = commentsByPostID[data.postId].find(c => c.id === data.id);
      comment.status = data.status;
      await eventDispatcher('CommentUpdated', { postId: data.postId, comment });
      break;

    default:
      break;
  }

  res.send({ success: true });
})

app.listen(4001, () => {
  console.log('comments service is listening on 4001');
});
