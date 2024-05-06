from bs4 import BeautifulSoup
import requests

def extract_meta_image(article_url):
    try:
        response = requests.get(article_url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')

        og_image = soup.find("meta", property="og:image")
        twitter_image = soup.find("meta", property="twitter:image")
        
        if og_image and og_image.get("content"):
            return og_image["content"]
        elif twitter_image and twitter_image.get("content"):
            return twitter_image["content"]
        else:
            first_image_tag = soup.find("img")
            if first_image_tag and "src" in first_image_tag.attrs:
                return first_image_tag["src"]

        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019"

    except requests.exceptions.RequestException as e:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019"
