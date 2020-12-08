import os
import hashlib
import re
import pymysql.cursors


# Connection is the variable that connects to the database
# It uses local host because it is hosted on the same
# server as the database
# User is the username and password is the associated password
# database is the name of the database being accessed
connection = pymysql.connect(host='localhost', user='SYSTEM_USER',
                                       password='SecuritE-mail', database='phrases', charset="latin1",
                                       cursorclass=pymysql.cursors.DictCursor, port=3306)
phrases = []
# This try block is the execution of the connection
# It will launch the query and store the results
# as a list of dictionaries inside result.
# The key for each dictionary is the row queried for
# EX: SELECT row FROM database.table
try:
	cursor =  connection.cursor()
	cursor.execute("SELECT phrases FROM phrases.phrases")
	result = cursor.fetchall()
	for i in range(0, len(result)):
		phrases.append(result[i]['phrases'])
except:
	print("failure")



# This is the hashing function
# It was a stretch goal and there was a basic version experimented with
# However, if in the future a hashing function were to be implemented
# There is a ready frame for it here
def toHash(email):
    """
    This is the hashing function that will change
    the string from plaintext to an encrypted string

    :param email: the string version of the email
    :return: hashed version of the email
    """
    hashed = email
    #email = re.findall(r"[\w']+", email)  # Ignore whitespace and punctuation
    #for i in email:  # Loop through individual in provided text
    #    salt = os.urandom(32)  # Generate a random salt
    #    i = hashlib.pbkdf2_hmac(
    #        'sha256',  # Hash algorithm to use
    #        i.encode('utf-8'),  # Convert pasword to bytes
    #        salt,  # Provide the salt
    #        100000)  # Number of iterations
    #    hashed += i.hex()  # Appends hashed version of word as hex characters
    return hashed


def calculateScore(email: str, phrases: list):
    """
    Calculates the score for the email

    :param email: hashed version of email
    :param phrases: list of all the words
    :return: the score (pings) of the email
    """
	# txt is the email but put into upper case
	# At the moment toHash does no hashing
    txt = toHash(email).upper()
    score = 0

	# Finds occurences of each word in the retrieved database
	# then finds an instance of it inside the email string
	# does not count repeats
    for i in range(0, len(phrases)):
        pos = txt.find(phrases[i].upper())
        if pos > -1:
            score = score + 1

    return score


# Everything is testing below this
# ======================================================================================================================
def rating(score):
    if score == 0:
        print("Risk Level: None")
    elif score == 1:
        print("Risk Level: Low")
    elif score == 2:
        print("Risk Level: Medium")
    else:
        print("Risk Level: High")

    return score


# ======================================================================================================================

hashedPhrases = []

tst = input()
print(calculateScore(tst, phrases))
