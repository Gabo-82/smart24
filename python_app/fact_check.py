#The API gives a score between 0 and 1 he higher the score, the more likely 
#the sentence contains check-worthy factual claims. The lower the score,
#the more non-factual, subjective and opinionated the sentence is

#The goal is to use the short description from the article as the input for the API

import requests
import json

def fact_check(input):

    # If Article has no description or description is ""
    if (input==None or input==""):
        return 0.0
    api_key = "4f80e4f3aaea4cb59be3a10d05dfd60d"

    api_endpoint = "https://idir.uta.edu/claimbuster/api/v2/score/text/"
    request_headers = {"x-api-key": api_key}
    payload = {"input_text": input}

    # Send the POST request to the API and store the api response
    api_response = requests.post(url=api_endpoint, json=payload, headers=request_headers)

    response_data = api_response.json()

    # Extract the score from the response
    score = response_data['results'][0]['score']
    return score
