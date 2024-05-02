import openai
import sqlite3
import pandas as pd
import os

# or
# openai.api_key = os.environ["address"]


def get_sentiment(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": f"Sentiment analysis of the following text: answering with 0 to 10\n{text}\n"}]
                  )
    return response


db_file = '/Users/jineuiyoung/Downloads/news_articles.sqlite'

conn = sqlite3.connect(db_file)
query = "SELECT title, country, body FROM Articles"
df = pd.read_sql_query(query, conn)
conn.close()

for index, row in df.iterrows():
    sentiment = get_sentiment(row['body'])["choices"][0]["message"]["content"]
    print(f"<{row['title']}> from {row['country']} has {sentiment} sentimental score\n")
    

# text = "I am Happy"
# sentiment = get_sentiment(text)["choices"][0]["message"]["content"]
# print(f'"{text}" has {sentiment} sentimental score')