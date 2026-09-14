import sys
import logging
import turtle

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

# -------------------------------------------------------------
# 1. ENVIRONMENT & SCREEN SETUP
# -------------------------------------------------------------
screen = turtle.Screen()
screen.setup(width=800, height=600)
screen.bgcolor("#121316")
screen.title("Turtle Concept Lab: Interactive State & Motion")
screen.tracer(0)

# Coordinate boundaries (within 800x600 window)
MIN_X, MAX_X = -360, 360
MIN_Y, MAX_Y = -220, 220

# -------------------------------------------------------------
# 2. STATE VARIABLES
# -------------------------------------------------------------
step_size = 5.0
target_x = 0.0
target_y = 0.0
is_moving = False

input_buffer = ""
feedback_msg = "Type target 'X Y' and press ENTER, or CLICK inside the box."
feedback_color = "#8f95a5"
cursor_visible = True
cursor_tick = 0

# -------------------------------------------------------------
# 3. ACTOR SETUP
# -------------------------------------------------------------
cat = turtle.Turtle()
cat.shape("triangle")
cat.color("#ff9f43")
cat.shapesize(stretch_wid=1.4, stretch_len=1.8)
cat.penup()
cat.speed(0)

target_marker = turtle.Turtle()
target_marker.hideturtle()
target_marker.penup()

# Static background renderer for boundaries and instructions
env_pen = turtle.Turtle()
env_pen.hideturtle()
env_pen.penup()
env_pen.speed(0)

# Dynamic HUD renderer
hud = turtle.Turtle()
hud.hideturtle()
hud.penup()
hud.speed(0)

# Dynamic Input box renderer
ui_pen = turtle.Turtle()
ui_pen.hideturtle()
ui_pen.penup()
ui_pen.speed(0)

# -------------------------------------------------------------
# 4. STATIC ENVIRONMENT RENDERING
# -------------------------------------------------------------
def draw_environment():
    """Draws boundary box and permanent instructional guide."""
    env_pen.color("#252834")
    env_pen.pensize(2)
    
    # Boundary box
    env_pen.goto(MIN_X, MIN_Y)
    env_pen.pendown()
    for _ in range(2):
        env_pen.forward(MAX_X - MIN_X)
        env_pen.left(90)
        env_pen.forward(MAX_Y - MIN_Y)
        env_pen.left(90)
    env_pen.penup()

    # Cartesian origin marker (0,0)
    env_pen.goto(-10, 0)
    env_pen.pendown()
    env_pen.goto(10, 0)
    env_pen.penup()
    env_pen.goto(0, -10)
    env_pen.pendown()
    env_pen.goto(0, 10)
    env_pen.penup()

    # Top instructions
    env_pen.color("#61afef")
    env_pen.goto(-380, 270)
    env_pen.write("TURTLE COORDINATE LAB", font=("Consolas", 12, "bold"))
    
    env_pen.color("#727b8f")
    env_pen.goto(-380, 250)
    env_pen.write(f"Valid Coordinates: X [{MIN_X} to {MAX_X}] | Y [{MIN_Y} to {MAX_Y}] | Origin (0,0) is Center", font=("Consolas", 10, "normal"))

draw_environment()

# -------------------------------------------------------------
# 5. UI & STATE DRAWING FUNCTIONS
# -------------------------------------------------------------
def render_hud():
    hud.clear()
    hud.color("#00d2ff")
    hud.goto(-380, 228)
    hud.write(
        f"Pos: ({cat.xcor():.1f}, {cat.ycor():.1f})   Target: ({target_x:.1f}, {target_y:.1f})   Moving: {is_moving}",
        font=("Consolas", 10, "bold")
    )

def render_input_bar():
    ui_pen.clear()
    
    # Input field outline at bottom
    ui_pen.color("#2a2d37")
    ui_pen.goto(-380, -280)
    ui_pen.setheading(0)
    ui_pen.pendown()
    for _ in range(2):
        ui_pen.forward(760)
        ui_pen.left(90)
        ui_pen.forward(45)
        ui_pen.left(90)
    ui_pen.penup()

    # Active text buffer with blinking cursor
    ui_pen.goto(-370, -255)
    ui_pen.color("#ffffff")
    cursor_char = "_" if cursor_visible else " "
    ui_pen.write(f"> Input: {input_buffer}{cursor_char}", font=("Consolas", 11, "bold"))

    # Status / validation feedback line
    ui_pen.goto(-370, -274)
    ui_pen.color(feedback_color)
    ui_pen.write(feedback_msg, font=("Consolas", 9, "normal"))

def set_target(x, y):
    global target_x, target_y, is_moving, feedback_msg, feedback_color
    target_x = float(x)
    target_y = float(y)
    
    target_marker.clear()
    target_marker.goto(target_x, target_y)
    target_marker.dot(8, "#00ffaa")
    
    cat.setheading(cat.towards(target_x, target_y))
    is_moving = True
    feedback_msg = f"Navigating to ({int(target_x)}, {int(target_y)})..."
    feedback_color = "#00ffaa"
    logging.info("Target set to: (%s, %s)", target_x, target_y)

# -------------------------------------------------------------
# 6. INPUT INTERACTION (Always Active)
# -------------------------------------------------------------
def on_click(x, y):
    if MIN_X <= x <= MAX_X and MIN_Y <= y <= MAX_Y:
        set_target(x, y)
    else:
        global feedback_msg, feedback_color
        feedback_msg = f"Click outside valid boundary! Must be inside the box."
        feedback_color = "#e575bb"
        logging.warning("Click out of bounds: (%s, %s)", x, y)

def on_key_press(char):
    global input_buffer
    input_buffer += char

def on_backspace():
    global input_buffer
    input_buffer = input_buffer[:-1]

def on_enter():
    global input_buffer, feedback_msg, feedback_color
    parts = input_buffer.strip().split()
    logging.info("Parsing on-screen input: '%s'", input_buffer)
    
    try:
        if len(parts) != 2:
            raise ValueError("Enter two numbers: X Y")
        
        tx, ty = float(parts[0]), float(parts[1])
        
        if MIN_X <= tx <= MAX_X and MIN_Y <= ty <= MAX_Y:
            set_target(tx, ty)
        else:
            raise ValueError(f"X must be {MIN_X}..{MAX_X}, Y must be {MIN_Y}..{MAX_Y}")
            
    except ValueError as err:
        feedback_msg = f"Error: {err}"
        feedback_color = "#ff5555"
        logging.warning("Validation failure: %s", err)
        
    input_buffer = ""

# -------------------------------------------------------------
# 7. GAME LOOP
# -------------------------------------------------------------
def game_loop():
    global is_moving, feedback_msg, feedback_color, cursor_visible, cursor_tick

    # Cursor blink timing (~500ms cycle)
    cursor_tick += 1
    if cursor_tick % 30 == 0:
        cursor_visible = not cursor_visible

    # Physics step
    if is_moving:
        dist = cat.distance(target_x, target_y)
        if dist <= step_size:
            cat.goto(target_x, target_y)
            is_moving = False
            target_marker.clear()
            feedback_msg = f"Arrived at ({int(target_x)}, {int(target_y)}). Enter next target."
            feedback_color = "#00d2ff"
            logging.info("Target reached: (%s, %s)", target_x, target_y)
        else:
            cat.forward(step_size)

    render_hud()
    render_input_bar()
    screen.update()
    screen.ontimer(game_loop, 16)

# -------------------------------------------------------------
# 8. KEYBOARD BINDINGS
# -------------------------------------------------------------
screen.listen()
screen.onscreenclick(on_click)

screen.onkey(on_enter, "Return")
screen.onkey(on_backspace, "BackSpace")
screen.onkey(lambda: on_key_press(" "), "space")
screen.onkey(lambda: on_key_press("-"), "minus")

# Bind digits and common characters
for char in "0123456789.":
    screen.onkey(lambda c=char: on_key_press(c), char)

logging.info("Interactive lab initialized. Input box active at bottom of window.")
game_loop()
turtle.done()