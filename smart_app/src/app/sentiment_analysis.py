import openai
import os

# or
# openai.api_key = os.environ["address"]


def get_sentiment(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": f"Sentiment analysis of the following text: answering with 0 to 10\n{text}\n"}]
                  )
    return response


text = "I am very sad"
sentiment = get_sentiment(text)["choices"][0]["message"]["content"]
print(f'"{text}" has {sentiment} sentimental score')