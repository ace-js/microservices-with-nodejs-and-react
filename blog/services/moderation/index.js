const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const UNAUTHORIZED_WORDS = ['fuck', 'boobs', 'weed', 'cunt']

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    let status = 'approved'
    data.comment.content.split(' ').forEach(word => {
      if (UNAUTHORIZED_WORDS.includes(word.toLowerCase())) {
        status = 'rejected';
        return;
      }
    });
    
    await axios.post('http://localhost:4005/events', { type: 'CommentModerated', data: { postId: data.postId, id: data.comment.id, status } });
  }

  res.send({ success: true });
})

app.listen(4003, () => {
  console.log('Moderation service is listening on 4003');
});
