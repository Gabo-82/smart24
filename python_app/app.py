from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from news_finder import newsFinder
from db_wrapper import setup_database_tables, load_short_articles_to_db, load_full_body_to_db, load_sentiment_to_db, SQL_FILE
from api_keys import newsapi_key
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta


app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:5000', 'https://example.com', 'http://localhost:4200'])

scheduler = BackgroundScheduler()
scheduler.start()

api_key = newsapi_key

setup_database_tables()

scheduler.add_job(load_full_body_to_db, 'interval', seconds=10)
scheduler.add_job(load_sentiment_to_db, 'interval', seconds=20, start_date=datetime.now() + timedelta(seconds=20))

keywords = "Palestine"

short_data = newsFinder(keywords, api_key)
if (short_data[0] != ""):
    load_short_articles_to_db(short_data, keywords)
print("short data:")
print(short_data)
""" load_full_body_to_db()
load_sentiment_to_db() """



# Routing for API endpoints
@app.route('/api/articles')
def get_articles():
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, country FROM Articles")
    articles = cursor.fetchall()
    conn.close()
    return jsonify(articles)


@app.route('/api/article/<id>')
def get_single_article(id):
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    sql_query = "SELECT * FROM Articles where id = ?"
    cursor.execute(sql_query, (id,))
    article = {}
    for row in cursor.fetchall():
        id, title, country, url, key_words, date, img_url, category, description, language = row
        if id is not None:
            article["id"] = id
            article["title"] = title
            article["country"] = country
            article["url"] = url
            article["keyWords"] = key_words
            article["date"] = date
            article["imgUrl"] = img_url
            article["category"] = category
            article["description"] = description
            article["language"] = language

    conn.close()
    # print(article)
    return jsonify(article)


@app.route('/api/articles/<keyword>') # This one is for the worldmap
def get_articles_by_keyword(keyword):
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    sql_query = """SELECT a.*
    FROM Articles as a
    JOIN ArticleKeywords as ak ON a.id = ak.id
    JOIN Keywords as k ON ak.KeywordID = k.KeywordID
    WHERE k.Keyword = ?"""
    cursor.execute(sql_query, (keyword,))
    list_of_articles = []
    for row in cursor.fetchall():
        article = {}
        id, title, country, url, key_words, date, img_url, category, description, language = row
        if id is not None:
            article["id"] = id
            article["title"] = title
            article["country"] = country
            article["url"] = url
            article["keyWords"] = key_words
            article["date"] = date
            article["imgUrl"] = img_url
            article["category"] = category
            article["description"] = description
            article["language"] = language
            list_of_articles.append(article)
    conn.close()
    return jsonify(list_of_articles)


@app.route('/api/searchOnline/<keyword>') # This one is for the worldmap
def search_articles_by_keyword(keyword):
    api_key = newsapi_key
    short_data = newsFinder(keyword, api_key)

    if (short_data[0] != ""):
        load_short_articles_to_db(short_data, keyword) #This is the function that loads the articles to the database
        # if you comment out these front end breaks
        # load_full_body_to_db()
        # load_sentiment_to_db()
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()

    sql_query = """SELECT a.*
    FROM Articles as a
    JOIN ArticleKeywords as ak ON a.id = ak.id
    JOIN Keywords as k ON ak.KeywordID = k.KeywordID
    WHERE k.Keyword = ?
    LIMIT 50;
    """
    cursor.execute(sql_query, (keyword.lower(),))
    list_of_articles = []
    for row in cursor.fetchall():
        article = {}
        id, title, country, url, key_words, date, img_url, category, description, language = row
        if id is not None:
            article["id"] = id
            article["title"] = title
            article["country"] = country
            article["url"] = url
            article["keyWords"] = key_words
            article["date"] = date
            article["imgUrl"] = img_url
            article["category"] = category
            article["description"] = description
            article["language"] = language
            list_of_articles.append(article)
    conn.close()
    print(list_of_articles)
    return jsonify(list_of_articles)


if __name__ == '__main__':
    app.run(debug=False) #I changed it to false because if its in true it runs the app twice
