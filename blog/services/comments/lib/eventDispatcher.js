const axios = require('axios');

module.exports = (type, data) => axios.post('http://localhost:4005/events', { type, data });
