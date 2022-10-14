import './config';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const tts_client = new TextToSpeechClient();

export const synthesize = async (text: string) => {
	const [result] = await tts_client.synthesizeSpeech({
		input: {
			text
		},
		voice: {
			languageCode: 'en-GB',
			ssmlGender: 'FEMALE'
		},
		audioConfig: {
			audioEncoding: 'LINEAR16',
			pitch: 2,
			speakingRate: 1.1,
			sampleRateHertz: 16000
		}
	});

	return result.audioContent;
};
