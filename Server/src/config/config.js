import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

  },
  test: {
    user: process.env.TEST_DB_USER,
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.TEST_DB_PORT,
  },
  production: {
    url: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  stmpConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
