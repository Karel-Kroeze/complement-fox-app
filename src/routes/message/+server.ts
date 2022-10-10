import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';
import { Message, MESSAGES_PATH } from '$lib/server/message';
import { exec } from 'child_process';

const encodeWav = async (file: string) => {
	const output_file = file.replace(/\..+$/, '.wav');

	return new Promise((resolve, reject) => {
		exec(`ffmpeg -i "${file}" -c:a pcm_s16le -ar 16600 "${output_file}"`, (err, stdout, stderr) => {
			if (err) {
				return reject(err);
			}
			return resolve({ stdout, stderr });
		});
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const [blob, message] = await Promise.all([request.blob(), Message.create()]);
	const file_path = path.join(MESSAGES_PATH, `${message.id}.weba`);
	await fs.writeFile(file_path, blob.stream());
	await encodeWav(file_path);

	return new Response(JSON.stringify(message.toJSON()));
};
