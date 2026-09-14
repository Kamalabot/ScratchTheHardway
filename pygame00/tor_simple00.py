import turtle

# 1. SETUP THE PLAYGROUND
screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("#222")
screen.title("Cat Adventure")

# Draw a guide box so the student knows where the cat can go
guide = turtle.Turtle()
guide.hideturtle()
guide.color("#555")
guide.penup()
guide.goto(-250, -250)
guide.pendown()
for _ in range(4):
    guide.forward(500)
    guide.left(90)

# Write a simple helper title on screen
guide.penup()
guide.goto(-240, 260)
guide.color("#aaa")
guide.write("Click anywhere inside the box, or press SPACE to type numbers!", font=("Arial", 11, "bold"))

# 2. CREATE OUR CAT
cat = turtle.Turtle()
cat.shape("turtle")  # Built-in friendly shape
cat.color("orange")
cat.shapesize(2, 2)
cat.penup()

# Target dot
target = turtle.Turtle()
target.hideturtle()
target.color("cyan")
target.penup()

# 3. MOVEMENT FUNCTION (The Recipe)
def move_cat_to(target_x, target_y):
    # Step A: Show where we want to go
    target.goto(target_x, target_y)
    target.dot(15)

    # Step B: Turn the cat towards that dot
    cat.setheading(cat.towards(target_x, target_y))

    # Step C: Loop forward until we get close enough
    while cat.distance(target_x, target_y) > 5:
        cat.forward(5)

    # Step D: Erase the target dot when arrived
    target.clear()

# 4. HOW TO GET INPUT
# Way 1: Clicking with the mouse
def on_click(x, y):
    # Keep it inside our boundary box
    if -250 <= x <= 250 and -250 <= y <= 250:
        move_cat_to(x, y)

# Way 2: Typing numbers with the Spacebar
def ask_numbers():
    # Ask for X
    x_text = screen.textinput("Where to go?", "Enter X (-250 to 250):")
    if not x_text:
        return

    # Ask for Y
    y_text = screen.textinput("Where to go?", "Enter Y (-250 to 250):")
    if not y_text:
        return

    try:
        new_x = float(x_text)
        new_y = float(y_text)
        if -250 <= new_x <= 250 and -250 <= new_y <= 250:
            move_cat_to(new_x, new_y)
    except ValueError:
        pass  # Ignore invalid entries

# 5. LISTEN FOR THE STUDENT
screen.listen()
screen.onscreenclick(on_click)
screen.onkey(ask_numbers, "space")

screen.mainloop()