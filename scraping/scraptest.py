import nltk
from newspaper import Article

url = 'https://www.biobiochile.cl/noticias/nacional/chile/2024/04/29/orsini-no-da-unanimidad-para-votar-ruf-hasta-total-despacho-en-comisiones-pidio-discutir-con-tiempo.shtml'
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