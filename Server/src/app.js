import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './helpers/logger';
import config from './config/config';
import router from './routes/index';

// init app
const app = express();

// using Destructuring to get Port
const {
  development: {
    app: {
      port,
    },
  },
} = config;

//   parse request
app.use(bodyParser.json(), bodyParser.urlencoded({
  extended: false,
}));


app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr,
}));

app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
}));

// connect route
app.use('/', router);


app.listen(port, () => logger.info(`Server started on port ${port}`));

export default app;
