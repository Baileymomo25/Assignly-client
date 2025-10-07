// Frontend configuration - PUT THIS IN A NEW FILE: src/config.js

const config = {
    development: {
      API_URL: 'http://localhost:10000'
    },
    production: {
      API_URL: 'https://assignly2.onrender.com' // REPLACE WITH YOUR ACTUAL RENDER URL
    }
  };
  
  export default config[process.env.NODE_ENV || 'development'];