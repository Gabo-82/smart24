import requests
from newspaper import Article
from newspaper.article import ArticleException
import nltk
import sys
from getimage import extract_meta_image

# Cambia la codificación de salida a UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# use this function for normal use
def newsFinder(keywords, api_key):
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keywords}&language=en"
    response = requests.get(url)
    if response.status_code >= 400:
        return ["", "", "", "", "", "", "", "", ""]
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
            if image_url == None:
                # print(image_url)
                image_url = extract_meta_image(url)
                # print(f"after{image_url}")
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


# # use this version to populate database
# # "error fetching article" -> probably exceeded rate limit (30 API credits/15 minutes)
# def newsFinder(search_keywords, api_key, max_pages=10):
#     print(search_keywords)
#     all_news_data = []
#     search_keywords = search_keywords.strip()
#     if ' ' in search_keywords:
#         search_keywords = search_keywords.replace(' ', '%20')
#     url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={search_keywords}&language=en"
    
    
#     for page in range(max_pages):
#         print(f"Fetching data for page {page + 1}...")
#         response = requests.get(url)
#         print('--------------------------------------------------------')
#         print('URL:', url)

#         if response.status_code >= 400:
#             print(f"Error fetching data for page {page + 1}")
#             continue

#         data = response.json()

#         if "results" in data:
#             articles = data["results"]
#             for article in articles:
#                 newdat = []
#                 title = article.get("title", "Title not available")
#                 country = article.get("country", "Country not available")
#                 article_url = article.get("link", "URL not available")
#                 keywords = article.get("keywords", "Keywords not available")
#                 pub_date = article.get("pubDate", "Published date not available")
#                 image_url = article.get("image_url", "Image URL not available")
                
#                 # If image_url is None, attempt to extract from article_url
#                 if not image_url:
#                     image_url = extract_meta_image(article_url)

#                 category = article.get("category", "Category not available")
#                 description = article.get("description", "Description not available")
#                 language = article.get("language", "Language not available")

#                 newdat.append(title)
#                 newdat.append(country)
#                 newdat.append(article_url)
#                 newdat.append(keywords)
#                 newdat.append(pub_date)
#                 newdat.append(image_url)
#                 newdat.append(category)
#                 newdat.append(description)
#                 newdat.append(language)

#                 all_news_data.append(newdat)

#         if "nextPage" in data:
#             next_page_token = data["nextPage"]
#             url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={search_keywords}&language=en&page={next_page_token}"
#         else:
#             break  # Stop fetching if no more next page token or reached max_pages

#     return all_news_data


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
        data.append(summary)
    except ArticleException as e:
        print(f"Error downloading an article, URL:", url)
        data.append("Body not available")
        data.append("Summary not available")
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
