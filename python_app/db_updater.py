import sqlite3

# Connect to the database
conn = sqlite3.connect('news_articles2.db')
cursor = conn.cursor()

# List of columns to update
columns = ['id','score', 'sentiment', 'goodOrbad', 'bias']

# Loop through each column
for column in columns:
    # Execute the update query for each column
    cursor.execute("UPDATE Sentiment SET {} = 'n' WHERE {} = '-'".format(column, column))
    cursor.execute("UPDATE Sentiment SET {} = 'n' WHERE {} = ' -'".format(column, column))
    cursor.execute("UPDATE Sentiment SET {} = 'n' WHERE {} = ' - '".format(column, column))
    
update_queries = [
    "UPDATE Sentiment SET sentiment = 'hopeful' WHERE sentiment = ' hopeful'",
    "UPDATE Sentiment SET sentiment = 'celebratory' WHERE sentiment = ' celebratory'",
    "UPDATE Sentiment SET sentiment = 'informative' WHERE sentiment = ' informative'",
    "UPDATE Sentiment SET sentiment = 'critical' WHERE sentiment = ' critical'",
    "UPDATE Sentiment SET sentiment = 'angry' WHERE sentiment = ' angry'",
    "UPDATE Sentiment SET sentiment = 'sad' WHERE sentiment = ' sad'"
]

# Ejecutar cada consulta de actualización
for query in update_queries:
    cursor.execute(query)

#do the same for the row goodOrbad

update_queries = [
    "UPDATE Sentiment SET goodOrbad = 'good' WHERE goodOrbad = ' good'",
    "UPDATE Sentiment SET goodOrbad = 'bad' WHERE goodOrbad = ' bad'"
]

for query in update_queries:
    cursor.execute(query)

#do the same for the row bias

update_queries = [
    "UPDATE Sentiment SET bias = 'biased' WHERE bias = ' biased'",
    "UPDATE Sentiment SET bias = 'neutral' WHERE bias = ' neutral'"
]

for query in update_queries:
    cursor.execute(query)


# Commit the changes
conn.commit()

# Close the connection
conn.close()
