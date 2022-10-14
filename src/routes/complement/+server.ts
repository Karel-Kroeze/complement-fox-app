import { complement } from '$lib/server/openai';
import type { RequestHandler } from './$types';
import { synthesize } from '../../lib/server/text-to-speech';

export const GET: RequestHandler = async ({ url }): Promise<Response> => {
	const complement_text = await complement(url.searchParams.get('q') ?? undefined);
	if (!complement_text) {
		return new Response('COMPLIMENT NOT FOUND', { status: 404 });
	}

	const complement_audio = await synthesize(complement_text);
	if (!complement_audio) {
		return new Response('WORDS NOT FOUND', { status: 404 });
	}

	return new Response(complement_audio, {
		headers: {
			'Content-Type': 'audio/wav',
			'Content-Disposition': "inline; filename='complement.wav'"
		}
	});
};
