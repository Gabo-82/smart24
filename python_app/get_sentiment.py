import openai

openai.api_key = "API KEY HERE"


def get_sentiment(text):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": f"""Do sentiment analysis of the following text like this: First, give the text a sentimental score from 0(sad) to 10(happy). 
                   Secondly, analyse which of these sentiments would describe the sentiment of the text best, this answer must be one word from this sentiment list "hopeful, celebratory, informative, critical, angry, sad".
                   Thirdly, tell me if it's good news or bad news for a general citizen. You must answer with only "good" or "bad". 
                   Lastly, tell me if this article seems biased or neutral. Also in this case you must answer with one of those two words.
                   Please seperate your answer with comas. For example, '5, inspiring, good, neutral'. In case no text is provided, just answer 
                   -, -, -, -\n{text}\n"""}]
                  )
    
    sentiment = response.choices[0].message.content
    score, sentiment, goodOrbad, bias = sentiment.split(", ")
    return score, sentiment, goodOrbad, bias