module.exports = (state) => (type, data) => {
  switch (type) {
    case 'PostCreated':
      state[data.id] = {
        id: data.id,
        title: data.title,
        comments: []
      };
      break;

    case 'CommentCreated':
      if (state[data.postId]) {
        state[data.postId].comments.push(data.comment);
      }
      break;

    case 'CommentUpdated':
      if (state[data.postId]) {
        state[data.postId].comments = state[data.postId].comments.map(item => {
          if (item.id === data.comment.id) {
            return data.comment;
          }
          return item;
        });
      }
      break;

    default:
      break;
  }
}