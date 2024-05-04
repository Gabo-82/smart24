import openai
import sqlite3
import pandas as pd
import re
import os

openai.api_key = "KEY HERE"


def get_sentiment(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": f"""Sentiment analysis of the following text: First, score that sentimental between 0(sad) to 10(happy). 
                   Second answering how was it feeling exactly, in world word. Your answer must be in this sentiment list "hopeful, celebratory, informative, critical, angry, sad".
                   Third, tell me is it good news or bad news for general citizen. You must answer it with only good or bad. 
                   Lastly, answerit is this article is bias or neutral. Also in this case you must anser bias or neutral.
                   Please seperate your answer with comas. For example, '5, inspiring, good, neutral'\n{text}\n"""}]
                  )
    sentiment = response["choices"][0]["message"]["content"]
    # print(sentiment)
    return str(sentiment) 


db_file = '/Users/jineuiyoung/Downloads/news_articles_841.sqlite'
new_db_file = '/Users/jineuiyoung/Downloads/news_articles_841_ai.sqlite'


conn = sqlite3.connect(db_file)
query = "SELECT title, country, body FROM Articles"
df = pd.read_sql_query(query, conn)
conn.close()

new_conn = sqlite3.connect(new_db_file)
new_cursor = new_conn.cursor()


try:
    new_cursor.execute("ALTER TABLE Articles ADD COLUMN sentiment TEXT")
except sqlite3.OperationalError:
    pass

# add only row
new_cursor.execute("""CREATE TABLE IF NOT EXISTS Articles (
                    id INTEGER PRIMARY KEY,
                    score TEXT,
                    sentiment TEXT,
                    goodOrbad TEXT
                    bias TEXT)""")

# add new file
# new_cursor.execute("""CREATE TABLE IF NOT EXISTS Articles (
                    # id INTEGER PRIMARY KEY,
                    # title TEXT,
                    # country TEXT,
                    # body TEXT,
                    # sentiment TEXT)""")


# if you need to add only row, then you should use curosr, conn(not new_cursor, new_conn)

for index, row in df.iterrows():
    result = get_sentiment(row['body']).replace(",", "").split()
    score = result[0]
    sentiment = result[1]
    goodOrbad = result[2]
    bias = result[-1]
    
    title = row['title']
    country = row['country']
    body = row['body']
    new_cursor.execute("INSERT INTO Articles (score, sentiment, goodOrbad, bias) VALUES (?, ?, ?, ?)", (score, sentiment, goodOrbad, bias))
    # new_cursor.execute("INSERT INTO Articles (title, country, body, sentiment) VALUES (?, ?, ?, ?)", (title, country, body, sentiment))
    new_conn.commit()

new_conn.close()

print("gooooood")


# for index, row in df.iterrows():
    # sentiment = get_sentiment(row['body'])
    # print(f"<{row['title']}> from {row['country']} has {sentiment} sentimental score\n")
    

# text = "I am Happy"
# sentiment = get_sentiment(text)["choices"][0]["message"]["content"]
# print(f'"{text}" has {sentiment} sentimental score')
