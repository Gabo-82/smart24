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
    
    keywords = "Palestine"
    api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
    completeData = getCompleteNewsData(keywords, api_key)

    for newsItem in completeData:
        title, country, url, date, body, summary = newsItem
        cursor.execute("INSERT INTO Articles (title, country, url, date, body, summary) VALUES (?, ?, ?, ?, ?, ?)", (title, country, url, date, body, summary))
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
    print(article)
    return jsonify(article)

if __name__ == '__main__':
    app.run(debug=True)
