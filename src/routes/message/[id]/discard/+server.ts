import type { RequestHandler } from './$types';
import { Message, MESSAGES_PATH } from '$lib/server/message';
import fs from 'fs/promises';
import path from 'path';

const tryDiscard = async (id: string, extensions = ['wav', 'weba']) => {
	for (const ext of extensions) {
		const file_path = path.join(MESSAGES_PATH, `${id}.${ext}`);

		try {
			await fs.unlink(file_path);
		} catch (err) {
			console.error(`failed to discard '${file_path}': ${err}`);
		}
	}
};

export const GET: RequestHandler = async ({ request, params }) => {
	const message = await Message.findByPk(params.id);

	if (!message) {
		return new Response('MESSAGE NOT FOUND', { status: 404 });
	}

	await message.destroy();
	await tryDiscard(message.id);

	return new Response('OK');
};
