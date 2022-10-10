import express from 'express';
import { handler } from './build/handler.js';

const app = express();

// inject static server for messages
app.use('/messages', express.static('./messages', { index: false }));

// for everything else, use the svelte-node handler
app.use(handler);

app.listen(3000, '0.0.0.0', () => {
	console.log("Listening on '0.0.0.0:3000'...");
});
