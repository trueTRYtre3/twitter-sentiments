from flask import Flask, jsonify, request, json
from flask_cors import CORS
import os
import requests
import re
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

# os.environ.get("headers")

def predict_sentiment(word):
    """
    This function retrieves and analyzes the 
    sentiments for tweets regarding a specific topic
    and returns sentimnets in a json file
    """
    sid = SentimentIntensityAnalyzer()
    data = requests.get('https://api.twitter.com/2/tweets/search/recent?query=seattle', headers=os.environ.get('headers'))
    
    text_data = [x['text'] for x in data.json()['data']]
    cleaned_text = []
    for text in text_data:
        newText = re.sub(r"((@[A-Za-z':]+|(RT)|(#)|(htt[A-z/0-9':?=.]*)|(\\)))", r'', text)
        cleaned_text.append(newText.strip())

    text_data = pd.DataFrame(cleaned_text, columns=['Text'])
    sentiments = text_data['Text'].apply(lambda x: sid.polarity_scores(x))
    text_data['compound'] = sentiments.apply(lambda x: x['compound'])

    def compound_score(x):
        if x >= 0.05:
            return 'POSITIVE'
        elif x <= -0.05:
            return 'NEGATIVE'
        return 'NEUTRAL'

    text_data['compound_score'] = text_data['compound'].apply(compound_score)

    return text_data.to_json(orient='records')


@app.route('/')
def root():
    return 'Hello'

@app.route('/tweet')
def tweet(data):
    return jsonify({
        'success': 'success',
        'data': data
    })



if __name__ == '__main__':
    app.run(debug=True)