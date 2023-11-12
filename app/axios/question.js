// axiosInstance.js
const axios = require('axios');

// Create an Axios instance with your desired configuration
const instance = axios.create({
  baseURL: `${process.env.API_BASE_URL}/questions`, // Your API base URL
  // Add any other Axios configuration options here
});

module.exports = instance;