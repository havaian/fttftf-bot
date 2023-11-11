# main.py

import whisper
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        data = request.get_json()
        wh_model = data.get('wh_model')
        audio_path = data.get('audio_path')

        if not wh_model or not audio_path:
            return jsonify({'error': 'Both wh_model and audio_path are required.'}), 400

        model = whisper.load_model(wh_model)

        # Load audio and pad/trim it to fit 30 seconds
        result = model.transcribe(audio_path, language="ru", fp16=False, verbose=True)

        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
