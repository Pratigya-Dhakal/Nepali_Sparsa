import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
