




message = input()

message.strip()
def clearTrackWhiteSpace(message) : 

    
    return " ".join(message.split())

message = clearTrackWhiteSpace(message)
def formatCase(message) :
    return message.capitalize()

def removeWhiteSpacePrevSpecialCharacter(message) :
    arrMessage = list(message)
    for i in range(0,len(message) - 1) : 
        if(message[i] == " " and (message[i+1] == "," or message[i+1] == ":" or message[i+1] == "." or message[i+1] == ";" ) ) :
            arrMessage[i] = ""
            message = "".join(arrMessage)
    
    return message

message = formatCase(message)
message = removeWhiteSpacePrevSpecialCharacter(message)
print(message)