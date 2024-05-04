import os
import sqlite3
from fact_check import fact_check
from news_finder import newsExtractContent

current_directory = os.path.abspath(os.path.dirname(__file__))
parent_directory = os.path.dirname(current_directory)

SQL_FILE = os.path.join(parent_directory, 'news_articles2.db')


os.makedirs(os.path.dirname(SQL_FILE), exist_ok=True)


# Connect to database (create if it doesn't exist), create table, and insert data (MAIN TABLE)
def setup_database_tables():
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS Articles ( 
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    country TEXT,
                    url TEXT,
                    keyWords TEXT,
                    date TEXT,
                    imgUrl TEXT,
                    category TEXT,
                   description TEXT,
                   language TEXT)""")
    # KEYWORD TABLE
    cursor.execute("""CREATE TABLE IF NOT EXISTS Keywords (
                    KeywordID INTEGER PRIMARY KEY,
                    Keyword TEXT)""")
    cursor.execute("""
    CREATE UNIQUE INDEX IF NOT EXISTS uniq_keyword ON Keywords(Keyword);""")
    # LINK KEYWORD AND ARTICLE IDS
    cursor.execute("""CREATE TABLE IF NOT EXISTS ArticleKeywords (
                    id INTEGER,
                    KeywordID INTEGER,
                    FOREIGN KEY (id) REFERENCES Articles(id),
                    FOREIGN KEY (KeywordID) REFERENCES Keywords(KeywordID),
                    PRIMARY KEY (id, KeywordID))""")
    # FACTCHECK SCORE TABLE
    cursor.execute("""CREATE TABLE IF NOT EXISTS FactCheckScore (
                    id INTEGER PRIMARY KEY,
                    score FLOAT)""")
    # FULL BODY AND SUMMARY TABLE
    cursor.execute("""CREATE TABLE IF NOT EXISTS FullBody (
                    id INTEGER PRIMARY KEY,
                    body TEXT,
                    summary TEXT)""")

    conn.commit()
    conn.close()


# Load short articles to database
def load_short_articles_to_db(short_data, keywords):
    print('Loading articles into database...')
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    for newsItem in short_data:
        #print(newsItem)
        # 485 is last proper row
        title, country, url, key_words, date, img_url, category, description, language = newsItem
        try:
            cursor.execute("""INSERT OR IGNORE INTO Keywords (Keyword) VALUES (?)""", (keywords,))
        except sqlite3.Error as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)
        try:
            cursor.execute("""INSERT INTO Articles (title, country, url, keyWords, date, imgUrl, category, description, language)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""", (title, str(country), url, str(key_words), date, img_url, category, description, language))
        except sqlite3.ProgrammingError as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)
            #for item in newsItem:
            #print(item)
        try:
            cursor.execute("""INSERT OR IGNORE INTO ArticleKeywords (id, KeywordID)
            SELECT last_insert_rowid(), k.KeywordID
            FROM Keywords as k
            WHERE k.Keyword = ?;
            """, (keywords,))
        except sqlite3.IntegrityError as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)

        score = fact_check(description)
        cursor.execute("""INSERT INTO FactCheckScore (score)
        VALUES (?)""", (score,))

        conn.commit()
    conn.close()

def load_full_body_to_db():
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()

    # Select articles that don't have full body and summary yet
    cursor.execute("""SELECT id, url FROM Articles WHERE id NOT IN 
                      (SELECT id FROM FullBody)""")

    articles_to_process = cursor.fetchall()

    for article_id, url in articles_to_process:
        # Extract content from the article's URL
        content = newsExtractContent(url)

        if content:
            body, summary = content
            print(body)
            print(summary)

            # Insert full body and summary into the FullBody table
            try:
                cursor.execute("""INSERT INTO FullBody (id, body, summary) 
                                  VALUES (?, ?, ?)""", (article_id, str(body), str(summary)))
                print('Im putting the articles!')
            except sqlite3.Error as e:
                print(f"Error inserting content into FullBody table: {e}")
                continue

    conn.commit()
    conn.close()


#For testing:
""" keywords = "Palestine"
api_key = 'pub_43440822cefee6d609bd2dafaa5eb09b7415c'
from news_finder import getCompleteNewsData, newsFinder
setup_database_tables()
short_data = newsFinder(keywords, api_key)
if (short_data[0] != ""):
    load_short_articles_to_db(short_data, keywords)
 """

load_full_body_to_db()



