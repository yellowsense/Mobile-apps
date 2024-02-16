import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.aasabie.com/api/',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    // Content-Type: "application/json",
    timeout: 1000,
  },
  // .. other options
});

export default instance;
