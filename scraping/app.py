from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from news_finder import getCompleteNewsData

app = Flask(__name__)

cors = CORS(app, origins=['http://localhost:4200', 'https://example.com'])


# Connect to database (create if doesn't), create table, and insert data
def setup_database():
    conn = sqlite3.connect('news_articles.db')
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS Articles (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    country TEXT,
                    url TEXT,
                    date TEXT,
                    body TEXT,
                    summary TEXT)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS Keywords (
                    KeywordID INTEGER PRIMARY KEY,
                    Keyword TEXT)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS ArticleKeywords (
                    id INTEGER,
                    KeywordID INTEGER,
                    FOREIGN KEY (id) REFERENCES Articles(id),
                    FOREIGN KEY (KeywordID) REFERENCES Keywords(KeywordID),
                    PRIMARY KEY (id, KeywordID))""")


    # for i in range(2, 486):
    #     cursor.execute("""
    #     INSERT INTO ArticleKeywords VALUES (?, 1)""", (i,))

    keywords = "Palestine"
    api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
    complete_data = getCompleteNewsData(keywords, api_key)

    for newsItem in complete_data:
        # 485 is last proper row
        title, country, url, date, body, summary = newsItem
        # THIS FAILS sometimes because country is a list sometimes, news_finder has to be edited
        try:
            cursor.execute("""INSERT INTO Keywords (Keyword) VALUES (?)""", (keywords,))
        except sqlite3.Error as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)
        try:
            cursor.execute("""INSERT INTO Articles (title, country, url, date, body, summary)
                VALUES (?, ?, ?, ?, ?, ?)""", (title, country, url, date, body, summary))
        except sqlite3.ProgrammingError as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)
            for item in newsItem:
                print(item)
        cursor.execute("""INSERT INTO ArticleKeywords (id, KeywordID)
        SELECT last_insert_rowid(), k.KeywordID
        FROM Keywords as k
        WHERE k.Keyword = ?;
        """, (keywords,))

        conn.commit()

    conn.close()


# Call the setup_database function when the Flask app starts
setup_database()


#Route
@app.route('/api/articles')
def get_articles():
    conn = sqlite3.connect('news_articles.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, country, body FROM Articles")
    articles = cursor.fetchall()
    conn.close()
    return jsonify(articles)


@app.route('/api/article/<id>')
def get_single_article(id):
    conn = sqlite3.connect("news_articles.db")
    cursor = conn.cursor()
    sql_query = "SELECT * FROM Articles where id = ?"
    cursor.execute(sql_query, (id,))
    article = {}
    for row in cursor.fetchall():
        id, title, country, url, date, body, summary = row
        if id is not None:
            article["id"] = id
            article["title"] = title
            article["country"] = country
            article["url"] = url
            article["date"] = date
            article["body"] = body
            article["summary"] = summary
    conn.close()
    # print(article)
    return jsonify(article)

@app.route('/api/articles/<country>/<keyword>')
def get_articles_by_country_keyword(country, keyword):
    conn = sqlite3.connect("news_articles.db")
    cursor = conn.cursor()
    sql_query = """SELECT a.*
    FROM Articles as a
    JOIN ArticleKeywords as ak ON a.id = ak.id
    JOIN Keywords as k ON ak.KeywordID = k.KeywordID
    WHERE k.Keyword = ? AND a.country = ?"""
    cursor.execute(sql_query, (keyword, country))
    list_of_articles = []
    for row in cursor.fetchall():
        article = {}
        id, title, country, url, date, body, summary = row
        if id is not None:
            article["id"] = id
            article["title"] = title
            article["country"] = country
            article["url"] = url
            article["date"] = date
            article["body"] = body
            article["summary"] = summary
            list_of_articles.append(article)
    conn.close()
    # print(list_of_articles)
    return jsonify(list_of_articles)

if __name__ == '__main__':
    app.run(debug=True)
