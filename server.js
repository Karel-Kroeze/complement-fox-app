import express from 'express';
import { handler } from './build/handler.js';

const app = express();

app.use((req, res, next) => {
	// just reflect request headers back

	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,HEAD,POST,DELETE');
	res.header('Access-Control-Allow-Headers', req.headers['access-control-allow-headers']);

	next();
});

// inject static server for messages
app.use('/messages', express.static('./messages', { index: false }));

// for everything else, use the svelte-node handler
app.use(handler);

app.listen(3000, '0.0.0.0', () => {
	console.log("Listening on '0.0.0.0:3000'...");
});
