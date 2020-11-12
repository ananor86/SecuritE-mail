import os
import hashlib
import re
import pyodbc as db
from BackEnd import pyConnect

connection = pyConnect.MySQLConnection(host='ec2-52-91-199-44.compute-1.amazonaws.com', user='SYSTEM_USER',
                                       password='SecuritE-mail', schema='phrases')


def toHash(email):
    """
    This is the hashing function that will change
    the string from plaintext to an encrypted string

    :param email: the string version of the email
    :return: hashed version of the email
    """
    hashed = ""
    email = re.findall(r"[\w']+", email)  # Ignore whitespace and punctuation
    for i in email:  # Loop through individual in provided text
        salt = os.urandom(32)  # Generate a random salt
        i = hashlib.pbkdf2_hmac(
            'sha256',  # Hash algorithm to use
            i.encode('utf-8'),  # Convert pasword to bytes
            salt,  # Provide the salt
            100000)  # Number of iterations
        hashed += i.hex()  # Appends hashed version of word as hex characters
    return hashed


def calculateScore(email: str, phrases: list):
    """
    Calculates the score for the email

    :param email: hashed version of email
    :param phrases: list of all the words
    :return: the score (pings) of the email
    """
    txt = toHash(email)
    score = 0

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


phrases = ["Track capacity", "Intercept range", "Radar range",
           "Missile type", "Missile flight", "Missile capability", "Radar capability",
           "Missile inventory", "Ship Capability", "Missile Range", "Missile Capacity", "Track Types",
           "Trackable Object"]
hashedPhrases = []
for i in phrases:
    salt = os.urandom(32)
    hashedPhrases.append(hashlib(pbkdf2_hmac('sha256'),
                                 i.encode('utf-8'),
                                 salt,
                                 10000))

emailtst = ("Good afternoon Professor Chu, We are pleased to tell you about the project involving missile flight."
            "There is a missile there and a missile here. The Radar range seems to be be off but that is nothing we "
            "cannot handle."
            "Therefore, we will no longer meander around and get to work. Ship Capability. Missile flight. Regards, "
            "Elon Musk")

print(hashedPhrases)
print(rating(calculateScore(emailtst, phrases)))
