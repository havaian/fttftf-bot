# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)

# should be outside
model = SentenceTransformer('cointegrated/rubert-tiny2')


@app.route('/get_solution_open_answer', methods=['POST'])
def get_solution_open_answer():
    try:
        data = request.get_json()

        answer_true = data['answer_true']
        answer_user = data['answer_user']

        embedding_1 = model.encode(answer_true, convert_to_tensor=True)
        embedding_2 = model.encode(answer_user, convert_to_tensor=True)

        # parts of the true answer

        score = util.pytorch_cos_sim(embedding_1, embedding_2)
        if score[0].item() > 0.7:
            result = 1
        else:
            result = 0

        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
