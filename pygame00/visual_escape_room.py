import turtle

# ==========================================
# CONCEPT 1: VARIABLES
# ==========================================
inventory = []
game_over = False

# ==========================================
# CONCEPT 2: OBJECTS (Classes)
# We define a "Room" object that knows how to 
# store its own data and draw itself!
# ==========================================
class Room:
    def __init__(self, name, description, floor_color, has_key=False, has_door=False):
        # Object Properties (State)
        self.name = name
        self.description = description
        self.floor_color = floor_color
        self.has_key = has_key
        self.has_door = has_door
        self.door_locked = True
        
    # Object Method (Behavior)
    def draw(self):
        """Draws the visual representation of the room."""
        room_pen.clear()
        
        # 1. Draw the floor/walls (A big square)
        room_pen.penup()
        room_pen.goto(-200, -100)
        room_pen.pendown()
        room_pen.color("white", self.floor_color)
        room_pen.begin_fill()
        # CONCEPT 3: LOOPS (drawing a square)
        for _ in range(4):
            room_pen.forward(400)
            room_pen.left(90)
        room_pen.end_fill()
        
        # 2. Draw Key if it exists in the room
        if self.has_key:
            room_pen.penup()
            room_pen.goto(100, -20)
            room_pen.pendown()
            room_pen.color("gold")
            room_pen.dot(30) # A simple dot for a key
            room_pen.penup()
            room_pen.goto(100, -45)
            room_pen.color("black")
            room_pen.write("Silver Key", align="center", font=("Arial", 12, "bold"))
            
        # 3. Draw Door if it exists
        if self.has_door:
            room_pen.penup()
            room_pen.goto(-150, -100)
            room_pen.pendown()
            
            # Change door color based on locked state
            if self.door_locked:
                room_pen.color("black", "darkred")
            else:
                room_pen.color("black", "darkgreen")
            
            room_pen.begin_fill()
            for _ in range(2):
                room_pen.forward(80)
                room_pen.left(90)
                room_pen.forward(150)
                room_pen.left(90)
            room_pen.end_fill()
            
            # Door label
            room_pen.penup()
            room_pen.goto(-110, -120)
            room_pen.color("white")
            status = "LOCKED" if self.door_locked else "OPEN"
            room_pen.write(f"DOOR ({status})", align="center", font=("Arial", 10, "bold"))

        screen.update()

# --- Screen Setup ---
screen = turtle.Screen()
screen.title("Visual Escape Room - Core Programming Concepts")
screen.setup(width=600, height=600)
screen.bgcolor("#1e1e1e")
screen.tracer(0) # Turn off automatic animation for instant drawing

# Create a turtle for drawing the room
room_pen = turtle.Turtle()
room_pen.hideturtle()
room_pen.speed(0)
room_pen.width(3)

# Create a turtle for printing text (the "Console")
text_pen = turtle.Turtle()
text_pen.hideturtle()
text_pen.speed(0)
text_pen.penup()
text_pen.color("white")

# Instantiate our Room Object
dungeon = Room(
    name="The Dark Dungeon", 
    description="A cold, stone room. You see a door and something shiny.", 
    floor_color="slategray", 
    has_key=True, 
    has_door=True
)

# Variable to track where the player is
current_room = dungeon


# ==========================================
# CONCEPT 4: FUNCTIONS & LOGIC
# ==========================================

def print_text(message):
    """Function to print text in our visual console at the bottom."""
    text_pen.clear()
    text_pen.goto(-280, -250) # Move to the bottom of the screen
    text_pen.write(message, font=("Courier", 14, "normal"))
    screen.update()

def take_action():
    """Logic for taking an item."""
    if current_room.has_key:
        inventory.append("silver key")
        current_room.has_key = False # Update the object's state
        current_room.draw()          # Redraw the room to show key is gone
        print_text("Action: You picked up the silver key!")
    else:
        print_text("Action: There is nothing to take here.")

def open_action():
    """Logic for opening a door using inventory variables."""
    global game_over
    if current_room.has_door:
        # Check if they have the required item
        if "silver key" in inventory:
            current_room.door_locked = False
            current_room.draw()
            print_text("SUCCESS! You unlocked the door and ESCAPED!")
            game_over = True
        else:
            print_text("Action: The door is locked. You need a key.")
    else:
        print_text("Action: There is no door here.")

def look_action():
    """Logic for printing the room description."""
    inv_str = ", ".join(inventory) if inventory else "Empty"
    message = f"[{current_room.name}] {current_room.description}\nInventory: [{inv_str}]"
    print_text(message)

# ==========================================
# KEYBOARD BINDINGS
# ==========================================
def on_key_t():
    if not game_over: take_action()

def on_key_o():
    if not game_over: open_action()
    
def on_key_l():
    if not game_over: look_action()

# Listen for user keyboard presses
screen.listen()
screen.onkey(on_key_t, "t") # Press 't' to take
screen.onkey(on_key_o, "o") # Press 'o' to open
screen.onkey(on_key_l, "l") # Press 'l' to look

# Start the game
current_room.draw()
print_text("Welcome to the Escape Room!\nPress 'l' to Look, 't' to Take, 'o' to Open.")

turtle.done()
