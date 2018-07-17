import dotenv from "dotenv";

dotenv.config();

const config = {
	development: {
		app: {
			port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
		}
	},
	test: {},
	production: {}
}

export default config;