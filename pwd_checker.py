import string
import getpass

def check_pwd():
    """Analyzes the strength of a user-provided password."""
    password = getpass.getpass("Enter Password: ")
    strength = 0
    remarks = ''
    lower_count = upper_count = num_count = wspace_count = special_count = 0

    # It's slightly more efficient to iterate directly over the string
    for char in password:
        if char in string.ascii_lowercase:
            lower_count += 1
        elif char in string.ascii_uppercase:
            upper_count +=1
        elif char in string.digits:
            num_count += 1
        elif char == ' ':
            wspace_count +=1
        else:
            special_count +=1

    # Award a point for each character type present
    if lower_count >= 1:
        strength +=1
    if upper_count >= 1:
        strength +=1
    if num_count >= 1:
        strength +=1
    if wspace_count >= 1:
        strength +=1
    if special_count >= 1:
        strength +=1

    # Determine remarks based on strength score
    if strength == 1:
        remarks = "Very Weak Password!!! 😱 Change ASAP."
    elif strength == 2:
        remarks = "Weak Password. 😟 You should consider a stronger one."
    elif strength == 3:
        remarks = "This is an okay password, but it could be better. 🤔"
    elif strength == 4:
        remarks = "This is a strong password. 👍"
    elif strength == 5:
        remarks = "Excellent! This is a very strong password. 💪"

    print("\n--- Password Analysis ---")
    print(f"Lowercase characters: {lower_count}")
    print(f"Uppercase characters: {upper_count}")
    print(f"Numeric characters: {num_count}")
    print(f"Whitespace characters: {wspace_count}")
    print(f"Special characters: {special_count}")
    print("-------------------------")
    print(f"Password Strength Score: {strength}/5")
    print(f"Remarks: {remarks}\n")

def ask_to_continue(another_pwd=False):
    """Asks the user if they want to continue, handling invalid input."""
    # CORRECTED: This loop now correctly re-prompts after invalid input.
    while True:
        if another_pwd:
            choice = input('Do you want to check another password? (y/n): ')
        else:
            choice = input('Do you want to check a password? (y/n): ')

        if choice.lower() == 'y':
            return True
        elif choice.lower() == 'n':
            print("Goodbye!")
            return False
        else:
            print('Invalid input. Please enter "y" or "n".')


if __name__ == '__main__':
    print('+++ Welcome to the Password Strength Checker +++')
    # The variable now clearly indicates its purpose
    should_continue = ask_to_continue()

    # CORRECTED: The loop condition now correctly checks the boolean variable
    # returned by the ask_to_continue function.
    while should_continue:
        check_pwd()
        should_continue = ask_to_continue(True)