import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './helpers/logger';
import router from './routes/index';

// init app
const app = express();

// Port
const port = parseInt(process.env.PORT, 10) || 9000;

// Allow CORS
app.use(cors());

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
