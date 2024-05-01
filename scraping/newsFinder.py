#This code is for extracting the Title, Body, Country, URL and Summary of the news obtained after searching based on keywords.

import sqlite3
import requests
import nltk
from newspaper import Article
from newspaper.article import ArticleException

def newsFinder(keywords, api_key): #This function returns an array with [[Title1, Country1, Url1],[Title2, Country2, Url2],...]
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keywords}"
    response = requests.get(url)
    data = response.json()
    newsData = []

    if "results" in data:
        articles = data["results"]
        for article in articles:
            newdat = []
            title = article.get("title", "Title not available")
            country = article.get("country", ["Country not available"])
            url = article.get("link", "URL not available")

            if isinstance(title, list) and len(title) == 1:
                title = title[0]
            if isinstance(country, list) and len(country) == 1:
                country = country[0]
            if isinstance(url, list) and len(url) == 1:
                url = url[0]

            newdat.append(title)
            newdat.append(country)
            newdat.append(url)
            newsData.append(newdat)
    
    return(newsData)

def newsExtractContent(url):
    data = []
    try:
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()

        date = article.publish_date
        body = article.text
        summary = article.summary

        data.append(date)
        data.append(body)
        data.append(summary)
    except ArticleException as e:
        print(f"Error downloading article from {url}: {e}")
        data = None
    return(data)

nltk.download('punkt')

keywords = "Palestine" #Input by the user
api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
newData = newsFinder(keywords, api_key) #Arrays with all the URLs collected

""" dat = newsExtractContent(newData[2][2])
print(dat) """

completeData = []
for newsItem in newData:
    title, country, url = newsItem
    contentData = newsExtractContent(url)
    if contentData is not None:
        completeNewsItem = [title, country, url] + contentData
        completeData.append(completeNewsItem)

print("The amount of news: ")
print(len(completeData)) #completedata is an array of arrays [[title, country, url, date, body, summary],...]



#Flask & connection to database
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

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

    for newsItem in completeData:
        title, country, url, date, body, summary = newsItem
        cursor.execute("INSERT INTO Articles (title, country, url, date, body, summary) VALUES (?, ?, ?, ?, ?, ?)",
                    (title, country, url, date, body, summary))
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

