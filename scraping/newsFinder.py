#This code is for extracting the Title, Body, Country, URL and Summary of the news obtained after searching based on keywords.

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
    print(article.text)

keywords = "Palestine Conflict" #Input by the user
api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
urls = newsFinder(keywords, api_key) #Arrays with all the URLs collected

#for url in urls:





