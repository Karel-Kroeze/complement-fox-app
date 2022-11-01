import './config';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const tts_client = new TextToSpeechClient();

export const synthesize = async (text: string, voice: string = 'en-AU-Neural2-B') => {
	let languageCode = voice.slice(0, 5);
	let name = voice;

	const [result] = await tts_client.synthesizeSpeech({
		input: {
			text
		},
		voice: {
			languageCode,
			name
		},
		audioConfig: {
			audioEncoding: 'LINEAR16',
			pitch: -2,
			speakingRate: 1.1,
			sampleRateHertz: 16000
		}
	});

	return result.audioContent;
};

export const listVoices = async () => {
	const [result] = await tts_client.listVoices({});
	return result.voices;
};
