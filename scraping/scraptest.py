import nltk
from newspaper import Article

url = 'https://www.aljazeera.com/news/2024/4/29/columbia-university-threatens-suspension-over-pro-palestinian-protests'
article = Article(url)

#NLP
article.download()
article.parse()
nltk.download('punkt')
article.nlp()

#print(article.authors)
#print(article.publish_date)
#print(article.top_image)
print(article.text)