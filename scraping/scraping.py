import requests

def get_news(keyword, api_key):
    url = f"https://newsdata.io/api/1/news?apikey={api_key}&q={keyword}"
    response = requests.get(url)
    data = response.json()
    # print(data)

    if "results" in data:
        articles = data["results"]
        for article in articles:
            title = article.get("title", "Title not available")
            countries = article.get("country", ["Country not available"])
            url = article.get("link", "URL not available")
            print("Title:", title)
            print("Country:", ", ".join(countries))
            print("URL:", url)
            

api_key = 'pub_43149e792f981a89e8244c3d6ec8030fae0da'
keyword = input("Enter a keyword: ")
get_news(keyword, api_key)
