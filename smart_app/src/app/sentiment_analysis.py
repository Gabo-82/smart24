from openai import OpenAI
import os

client = OpenAI()
# or
# openai.api_key = os.environ["address"]


def get_sentiment(text):
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
      ]
    )
    return response


text = "I am happy"
sentiment = get_sentiment(text)
print(sentiment)
