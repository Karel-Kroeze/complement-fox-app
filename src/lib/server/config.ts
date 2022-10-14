import { config } from 'dotenv';

if (process.env.ENV !== 'PRODUCTION') {
	config({ debug: true });
}
