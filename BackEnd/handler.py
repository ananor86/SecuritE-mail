def toHash(email):
    hashed = email.upper()
    return hashed


def calculateScore(email: str, phrases: list):
    txt = toHash(email)
    score = 0

    for i in range(0, len(phrases)):
        pos = txt.find(phrases[i].upper())
        if pos > -1:
            score = score + 1

    return score


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
emailtst = ("Good afternoon Professor Chu, We are pleased to tell you about the project involving missile flight."
            "There is a missile there and a missile here. The Radar range seems to be be off but that is nothing we "
            "cannot handle."
            "Therefore, we will no longer meander around and get to work. Ship Capability. Missile flight. Regards, "
            "Elon Musk")

print(rating(calculateScore(emailtst, phrases)))
