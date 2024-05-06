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


# Commit the changes
conn.commit()

# Close the connection
conn.close()
