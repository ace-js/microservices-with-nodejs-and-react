const axios = require('axios');

module.exports = (type, data) => axios.post('http://event-bus-clusterip-srv:4005/events', { type, data });
