import requests
from newspaper import Article
from newspaper.article import ArticleException
import nltk
import sys

# Cambia la codificación de salida a UTF-8
sys.stdout.reconfigure(encoding='utf-8')

def newsFinder(keywords, api_key):
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keywords}"
    response = requests.get(url)
    data = response.json()
    newsData = []

    if "results" in data:
        articles = data["results"]
        for article in articles:
            newdat = []
            title = article.get("title", "Title not available")
            country = article.get("country", "Country not available")
            url = article.get("link", "URL not available")

            if isinstance(title, list) and len(title) == 1:
                title = title[0]
            if isinstance(country, list) and len(country) == 1:
                country = country[0]  # Esto asegura que country sea un string en lugar de una lista
            if isinstance(url, list) and len(url) == 1:
                url = url[0]

            newdat.append(title)
            newdat.append(country)
            newdat.append(url)
            newsData.append(newdat)

    return newsData

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
        print(f"Error downloading an article")
        data = None
    return data

def getCompleteNewsData(keywords, api_key):
    nltk.download('punkt')
    newData = newsFinder(keywords, api_key)
    completeData = []
    for newsItem in newData:
        title, country, url = newsItem
        contentData = newsExtractContent(url)
        if contentData:
            completeNewsItem = [title, country, url] + contentData
            completeData.append(completeNewsItem)
    return completeData

if __name__ == "__main__":
    # Ejemplo de uso de las funciones si se ejecuta este archivo directamente
    keywords = "Palestine"
    api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
    completeData = getCompleteNewsData(keywords, api_key)
    print(completeData)


