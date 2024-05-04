import os
import sqlite3
from fact_check import fact_check

SQL_FILE = 'news_articles2.db'

assert (os.path.getsize(SQL_FILE) > 0)


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
                    imgUrl TEXT,
                    date TEXT,
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
    conn.commit()
    conn.close()


# Load short articles to database
def load_short_articles_to_db(short_data, keywords):
    conn = sqlite3.connect(SQL_FILE)
    cursor = conn.cursor()
    for newsItem in short_data:
        #print(newsItem)
        # 485 is last proper row
        title, country, url, key_words, date, img_url, category, description, language = newsItem
        # THIS FAILS sometimes because country is a list sometimes, news_finder has to be edited
        try:
            cursor.execute("""INSERT OR IGNORE INTO Keywords (Keyword) VALUES (?)""", (keywords,))
        except sqlite3.Error as er:
            print(er.sqlite_errorcode)
            print(er.sqlite_errorname)
        try:
            cursor.execute("""INSERT INTO Articles (title, country, url, keyWords, imgUrl, date, category, description, language)
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

        print(description)

        score = fact_check(description)
        cursor.execute("""INSERT INTO FactCheckScore (score)
        VALUES (?)""", (score,))
        print(score)

        conn.commit()

    conn.close()
