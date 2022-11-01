import type { RequestHandler } from './$types';
import { listVoices } from '$lib/server/text-to-speech';

export const GET: RequestHandler = async (): Promise<Response> => {
	const voices = await listVoices();

	if (!voices) {
		return new Response('ERROR LISTING VOICES', { status: 500 });
	}

	let voices_by_language = voices.reduce<{ [language: string]: any[] }>((acc, cur) => {
		if (!cur.languageCodes) {
			return acc;
		}

		for (let lang of cur.languageCodes) {
			if (!acc[lang]) {
				acc[lang] = [];
			}
			acc[lang].push(cur);
		}

		return acc;
	}, {});

	return new Response(JSON.stringify(voices_by_language));
};
