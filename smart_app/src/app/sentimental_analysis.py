import openai
import os

openai.api_key = os.environ["KEY"]

def get_sentiment(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Sentiment analysis of the following text:\n{text}\n",
        temperature=0.5,
        max_tokens=1,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["\n"]
    )

    sentiment = response.choices[0].text.strip()
    return sentiment


if __name__ == "__main__":
    text = "I am happy"
    sentiment = get_sentiment(text)
    print(sentiment)