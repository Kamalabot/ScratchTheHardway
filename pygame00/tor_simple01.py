import turtle

# -----------------------------------------
# 1. SETUP (The Stage)
# -----------------------------------------
screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("#1e1e24")
screen.title("Turtle Explorer")

# Draw a simple boundary box
box = turtle.Turtle()
box.hideturtle()
box.color("#555")
box.penup()
box.goto(-200, -200)
box.pendown()
for _ in range(4):
    box.forward(400)
    box.left(90)

# -----------------------------------------
# 2. OUR CHARACTER
# -----------------------------------------
cat = turtle.Turtle()
cat.shape("turtle")
cat.color("orange")
cat.penup()

# -----------------------------------------
# 3. THE RECIPE (Function)
# -----------------------------------------
def walk_to(target_x, target_y):
    # Turn towards the destination
    cat.setheading(cat.towards(target_x, target_y))
    
    # Loop: take small steps until we arrive
    while cat.distance(target_x, target_y) > 5:
        cat.forward(5)

# -----------------------------------------
# 4. THE MAIN LOOP (Keeps Asking Forever)
# -----------------------------------------
print("--- Objective: Is to read the code and figure out what is happening ---")
print("--- Get student to list all the steps the turtle takes ---")
print("Valid range: -200 to 200")
print("Type 'exit' or 'q' anytime to stop.")

while True:
    user_x = input("\nEnter X position: ") #Ask and Answer in same line
    if user_x.lower() in ["exit", "q"]: # Checking if user wants to quit
        print("Goodbye!")
        break

    user_y = input("Enter Y position: ") #Ask and Answer in same line
    if user_y.lower() in ["exit", "q"]: # Checking if user wants to quit
        print("Goodbye!")
        break

    # Convert the typed text into numbers
    x = float(user_x)
    y = float(user_y)

    # Check boundaries
    if -200 <= x <= 200 and -200 <= y <= 200:
        walk_to(x, y)
    else:
        print("Out of bounds! Stay between -200 and 200.")