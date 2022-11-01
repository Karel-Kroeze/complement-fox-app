import { complement } from '$lib/server/openai';
import type { RequestHandler } from './$types';
import { synthesize } from '../../lib/server/text-to-speech';

export const GET: RequestHandler = async ({ url }): Promise<Response> => {
	const { key, q, voice } = Object.fromEntries(url.searchParams.entries());
	if (key !== process.env.SUPER_SECRET_PASSWORD) {
		return new Response('COMPUTER SAYS NO', { status: 403 });
	}

	const complement_text = await complement(q);
	if (!complement_text) {
		return new Response('COMPLIMENT NOT FOUND', { status: 404 });
	}

	const complement_audio = await synthesize(complement_text, voice);
	if (!complement_audio) {
		return new Response('WORDS NOT FOUND', { status: 404 });
	}

	return new Response(complement_audio, {
		headers: {
			'Content-Type': 'audio/wav',
			'Content-Disposition': 'inline; filename=complement.wav',
			'Content-Length': complement_audio.length.toString()
		}
	});
};
