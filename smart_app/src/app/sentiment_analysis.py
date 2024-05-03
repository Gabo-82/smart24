import openai
import sqlite3
import pandas as pd
import os


def get_sentiment(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": f"Sentiment analysis of the following text: answering with 0 to 10\n{text}\n"}]
                  )
    sentiment = response["choices"][0]["message"]["content"]
    return str(sentiment) 


db_file = '/Users/jineuiyoung/Downloads/news_articles2_.sqlite'
new_db_file = '/Users/jineuiyoung/Downloads/news_articles2_ai.sqlite'


conn = sqlite3.connect(db_file)
query = "SELECT title, country, body FROM Articles"
df = pd.read_sql_query(query, conn)
conn.close()

new_conn = sqlite3.connect(new_db_file)
new_cursor = new_conn.cursor()


# try:
#     cursor.execute("ALTER TABLE Articles ADD COLUMN sentiment TEXT")
# except sqlite3.OperationalError:
#     pass

new_cursor.execute("""CREATE TABLE IF NOT EXISTS Articles (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    country TEXT,
                    body TEXT,
                    sentiment TEXT)""")

for index, row in df.iterrows():
    sentiment = get_sentiment(row['body'])
    title = row['title']
    country = row['country']
    body = row['body']
    
    # print(sentiment)
    new_cursor.execute("INSERT INTO Articles (title, country, body, sentiment) VALUES (?, ?, ?, ?)",
                   (title, country, body, sentiment))
    new_conn.commit()

new_conn.close()

print("godd")


for index, row in df.iterrows():
    sentiment = get_sentiment(row['body'])
    print(f"<{row['title']}> from {row['country']} has {sentiment} sentimental score\n")
    

# text = "I am Happy"
# sentiment = get_sentiment(text)["choices"][0]["message"]["content"]
# print(f'"{text}" has {sentiment} sentimental score')