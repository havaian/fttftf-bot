const axios = require('axios');

const whisperTranscribe = async (audioPath, whisperModel) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/transcribe', {
            wh_model: whisperModel,
            audio_path: audioPath,
        });
        return response.data.result;
    } catch (error) {
        console.error(`Error in Whisper transcription: ${error}`);
        throw error;
    }
}

// const audioPath = "../data/voice-msgs/01.wav";
// const wh_model = "small";

// (async function() {
//   const response = await whisperTranscribe(audioPath, wh_model);
//   console.log(response);
// })();

module.exports = whisperTranscribe;
