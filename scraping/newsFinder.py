#This code is for extracting the Title, Body, Country, URL and Summary of the news obtained after searching based on keywords.

import sqlite3
import requests
import nltk
from newspaper import Article

def newsFinder(keywords, api_key):
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keywords}"
    response = requests.get(url)
    data = response.json()
    urls = []

    if "results" in data:
        articles = data["results"]
        for article in articles:
            title = article.get("title", "Title not available")
            countries = article.get("country", ["Country not available"])
            url = article.get("link", "URL not available")
            urls.append(url)
    
    return(urls)

def newsExtractContent(url):
    article = Article(url)
    article.download()
    article.parse()
    nltk.download('punkt')
    article.nlp()

    #print(article.authors)
    #print(article.publish_date)
    #print(article.top_image)
    return(article.text)

keywords = "Palestine" #Input by the user
api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
urls = newsFinder(keywords, api_key) #Arrays with all the URLs collected

#connect to database
conn = sqlite3.connect('news_articles.db')
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS Articles
                  (id INTEGER PRIMARY KEY,
                   url TEXT,
                   content TEXT,
                   timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')


# Extract content from each URL and store in the database
for url in urls:
    content = newsExtractContent(url)
    cursor.execute("INSERT INTO Articles (url, content) VALUES (?, ?)", (url, content))
    conn.commit()

# Close connection
conn.close()

