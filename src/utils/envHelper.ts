import dotenv from 'dotenv';

dotenv.config(); // Load .env values into process.env

const environment = process.env.ENV || 'qa'; //checks the environment in .env file and takes the value. 
// If no value is found then defaults to 'qa'.

// 🔁 Smart logic for determining workers
const workers = process.env.WORKERS
  ? parseInt(process.env.WORKERS, 10)
  : environment === 'dev'
    ? 4
    : environment === 'qa'
      ? 2
      : 1;

export const config = {
  environment,
  workers,
  baseURL: process.env.BASE_URL || '',
  username: process.env.STANDARD_USER || '',
  password: process.env.STANDARD_PASSWORD || ''
};


//dotenv.config() = "Go read the .env file"

//config.environment = The ENV value you put (qa, dev, etc.)

//config.baseURL = The URL you want to open in your tests

//config.username / password = For login

