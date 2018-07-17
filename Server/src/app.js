import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from "path";
import bcrypt from "bcrypt";
import logger from "./helpers/logger";
import config from "./config/config";
// test bcrypt

// init app
const app = express();

//   Middleware
app.use(bodyParser.json(), bodyParser.urlencoded({
	extended: false,
}));

app.use(morgan('dev', {
	skip(req, res) {
		return res.statusCode < 400;
	},
	stream: process.stderr
}));

app.use(morgan('dev', {
	skip(req, res) {
		return res.statusCode >= 400;
	},
	stream: process.stdout
}));

// catch all routes
app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "index.html"));
});

// Define Port
const {
	development: {
		app: {
			port
		}
	}
} = config;

app.listen(port, () => logger.info(`Server started on port ${port}`));

export default app;