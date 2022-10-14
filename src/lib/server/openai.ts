import './config';
import { Configuration, OpenAIApi, type CreateCompletionRequest } from 'openai';
import { random } from '$lib/helpers';

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);
const default_params: CreateCompletionRequest = {
	model: 'text-davinci-002',
	max_tokens: 128,
	temperature: 0.9,
	top_p: 0.8,
	n: 1,
	frequency_penalty: 1.2
};

const QUALITIES = [
	'patience',
	'intelligence',
	'kindness',
	'helpfulness',
	'sense of humour',
	'curiousity',
	'creativeness',
	'empathy'
];

const completion = async (prompt: string): Promise<string | undefined> => {
	const params = Object.assign({}, default_params, { prompt });
	const result = await openai.createCompletion(params);

	console.log({ result: JSON.stringify(result.data, null, 2) });

	return result.data.choices?.[0].text;
};

export const complement = async (quality?: string): Promise<string | undefined> => {
	const _quality = quality ?? random(QUALITIES);
	const result = await completion(
		`Write a short compliment about my ${_quality}. For example, "you are an amazing human being, with incredible ${_quality}.\n`
	);

	return result?.replace('\n', ' ').trim();
};
