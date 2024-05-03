import requests
from newspaper import Article
from newspaper.article import ArticleException
import nltk
import sys

# Cambia la codificación de salida a UTF-8
sys.stdout.reconfigure(encoding='utf-8')


def newsFinder(keywords, api_key):
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keywords}&language=en"
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
            key_words = article.get("keywords", "Keywords not available")
            pub_date = article.get("pubDate", "Published date not available")
            image_url = article.get("image_url", "Image URL not available")
            category = article.get("category", "Category not available")
            description = article.get("description", "Description not available")
            language = article.get("language", "Language nos available")


            if isinstance(title, list) and len(title) == 1:
                title = title[0]
            if isinstance(country, list) and len(country) == 1:
                country = country[0]  
            if isinstance(url, list) and len(url) == 1:
                url = url[0]
            if isinstance(key_words, list) and len(key_words) == 1:
                key_words = key_words[0]
            if isinstance(pub_date, list) and len(pub_date) == 1:
                pub_date = pub_date[0]
            if isinstance(image_url, list) and len(image_url) == 1:
                image_url = image_url[0]
            if isinstance(category, list) and len(category) == 1:
                category = category[0]
            if isinstance(description, list) and len(description) == 1:
                description = description[0]
            if isinstance(language, list) and len(language) == 1:
                language = language[0]

            newdat.append(title)
            newdat.append(country)
            newdat.append(url)
            newdat.append(key_words)
            newdat.append(pub_date)
            newdat.append(image_url)
            newdat.append(category)
            newdat.append(description)
            newdat.append(language)
            newsData.append(newdat)

    return newsData


def newsExtractContent(url):
    data = []
    try:
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()

        body = article.text
        summary = article.summary

        data.append(body)
        #data.append(summary) Maybe we'll use the short description provided by the api instead of this summary
    except ArticleException as e:
        print(f"Error downloading an article")
        data = None
    return data

def getCompleteNewsData(keywords, api_key):
    nltk.download('punkt')
    newData = newsFinder(keywords, api_key)
    completeData = []
    for newsItem in newData:
        title, country, url, key_words, pub_date, image_url, category, description, language = newsItem
        contentData = newsExtractContent(url)
        if contentData:
            completeNewsItem = [title, country, url, key_words, pub_date, image_url, category, description, language] + contentData
            completeData.append(completeNewsItem)
    return completeData


if __name__ == "__main__":
    # Ejemplo de uso de las funciones si se ejecuta este archivo directamente
    keywords = "Palestine"
    api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
    completeData = getCompleteNewsData(keywords, api_key)
    print(completeData)

#bonjour