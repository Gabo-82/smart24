import nltk
from newspaper import Article

url = 'https://www.lavozdegalicia.es/noticia/deza/2024/04/30/precaridad-laboral-centra-lucha-sindical-zona-1-mayo/0003_202404D30C19932.htm'
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