import {
	Router
} from "express";
import path from "path";


const route = Router();

// index route
route.get('/api/v1', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// catch all routes 
route.get('/*', (req, res) => {
	res.status(404).json({
		message: `Page Not Found`
	});
})

export default route;