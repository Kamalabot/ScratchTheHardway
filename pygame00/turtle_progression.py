import turtle
import time

# ==============================================================================
# TEACHING PROGRESSION: Variables -> Logic -> Functions -> Loops -> Objects
# ==============================================================================

# Setup the screen and turtle
screen = turtle.Screen()
screen.title("Learning Progression: Variables to Objects")
screen.bgcolor("#f0f0f0")

t = turtle.Turtle()
t.shape("turtle")
t.pensize(3)
t.speed(4)

# To help learners see the progression, we will ask for input between steps.
def wait_for_user():
    turtle.textinput("Next Step", "Press Enter/OK to proceed!")

# ==========================================
# STEP 1: Variables, Printing, and Logic
# ==========================================
print("--- STEP 1: Variables and Logic ---")
t.color("blue")

# 1. Variables
rect_width = 150
rect_height = 80

# 2. Printing
print(f"We are going to draw a rectangle. Width: {rect_width}, Height: {rect_height}")

# 3. Logic
if rect_width > 100:
    print("That's a wide rectangle!")
else:
    print("That's a narrow rectangle!")

# Drawing sequentially (No loops or functions yet)
t.penup()
t.goto(-300, 150)
t.pendown()
t.write("Step 1: Sequential Variables", font=("Arial", 12, "normal"))
t.goto(-300, 130)

t.forward(rect_width)
t.right(90)
t.forward(rect_height)
t.right(90)
t.forward(rect_width)
t.right(90)
t.forward(rect_height)
t.right(90)

wait_for_user()


# ==========================================
# STEP 2: Wrapping Logic into a Function
# ==========================================
print("\n--- STEP 2: Functions ---")
print("Instead of typing all those commands again, let's use a function!")
t.color("green")

# Defining the function
def draw_rectangle(w, h):
    t.forward(w)
    t.right(90)
    t.forward(h)
    t.right(90)
    t.forward(w)
    t.right(90)
    t.forward(h)
    t.right(90)

# Move to a new spot
t.penup()
t.goto(-50, 150)
t.pendown()
t.write("Step 2: Function Call", font=("Arial", 12, "normal"))
t.goto(-50, 130)

# Call the function!
draw_rectangle(100, 50)

wait_for_user()


# ==========================================
# STEP 3: Introducing Loops
# ==========================================
print("\n--- STEP 3: Loops ---")
print("Notice how we repeated 'forward' and 'right' twice? Let's use a loop.")
t.color("purple")

# Improving the function with a loop
def draw_rectangle_with_loop(w, h):
    for i in range(2):  # The Loop!
        t.forward(w)
        t.right(90)
        t.forward(h)
        t.right(90)

# Move to a new spot
t.penup()
t.goto(150, 150)
t.pendown()
t.write("Step 3: Loops in Function", font=("Arial", 12, "normal"))
t.goto(150, 130)

# Draw a square using the looped function
draw_rectangle_with_loop(80, 80)

# --- NEW: Drawing multiple rectangles based on input ---
print("\nNow let's ask how many rectangles to draw, and loop that many times!")
t.color("magenta")
num_rects = turtle.numinput("Loops!", "How many rectangles do you want?", default=3, minval=1, maxval=10)

def draw_multiple_rectangles(count, w, h):
    for _ in range(int(count)):
        draw_rectangle_with_loop(w, h)
        # Move forward so they don't overlap completely
        t.penup()
        t.forward(w + 10)
        t.pendown()

t.penup()
t.goto(-200, 30)
t.pendown()
t.write(f"Drawing {int(num_rects)} rectangles using a loop!", font=("Arial", 12, "normal"))
t.goto(-200, 10)
draw_multiple_rectangles(num_rects, 40, 60)

wait_for_user()


# ==========================================
# STEP 4: Objects (Classes)
# ==========================================
print("\n--- STEP 4: Objects ---")
print("Now let's create different 'Shape' objects that know how to draw themselves.")

# Creating a Rectangle Object
class RectangleShape:
    def __init__(self, width, height, color):
        # Variables belonging to the object
        self.width = width
        self.height = height
        self.color = color
        
    def draw(self, start_x, start_y):
        t.penup()
        t.goto(start_x, start_y)
        t.pendown()
        t.color("black", self.color)
        t.begin_fill()
        
        # Using our loop logic inside the object's method!
        for _ in range(2):
            t.forward(self.width)
            t.right(90)
            t.forward(self.height)
            t.right(90)
            
        t.end_fill()

# Creating a Triangle Object
class TriangleShape:
    def __init__(self, size, color):
        self.size = size
        self.color = color
        
    def draw(self, start_x, start_y):
        t.penup()
        t.goto(start_x, start_y)
        t.pendown()
        t.color("black", self.color)
        t.begin_fill()
        
        # Loop for a triangle
        for _ in range(3):
            t.forward(self.size)
            t.left(120)
            
        t.end_fill()

# Creating a Circle Object
class CircleShape:
    def __init__(self, radius, color):
        self.radius = radius
        self.color = color
        
    def draw(self, start_x, start_y):
        t.penup()
        t.goto(start_x, start_y - self.radius) 
        t.pendown()
        t.color("black", self.color)
        t.begin_fill()
        t.circle(self.radius) # Turtle has a built-in circle method
        t.end_fill()

# --- Instantiating our Objects ---
red_rect = RectangleShape(120, 60, "red")
blue_triangle = TriangleShape(100, "cyan")
yellow_circle = CircleShape(50, "gold")

# --- Using our Objects ---
t.penup()
t.goto(-300, -100)
t.color("black")
t.write("Step 4: Objects (Instances of Classes)", font=("Arial", 14, "bold"))

# Tell the objects to draw themselves!
red_rect.draw(-300, -130)
blue_triangle.draw(-100, -180)
yellow_circle.draw(100, -130)

# Final message
t.penup()
t.goto(0, -280)
t.color("black")
t.write("Progression Complete! Check the console output.", align="center", font=("Arial", 16, "bold"))

print("Done! Check the turtle screen to see all the shapes.")
turtle.done()
