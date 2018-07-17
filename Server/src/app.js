import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from "path";
import logger from "./helpers/logger";
import config from "./config/config";

// init app
const app = express();

// Destructure and get Port
const {
	development: {
		app: {
			port
		}
	}
} = config;

//   parse request
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

// index route routes
app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => logger.info(`Server started on port ${port}`));

export default app;