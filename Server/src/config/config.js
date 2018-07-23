import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    app: {
      port: parseInt(process.env.PORT, 10) || process.env.DEV_APP_PORT,
    },
  },
  test: {},
  production: {},
};

export default config;
