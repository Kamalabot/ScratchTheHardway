import sys
import logging
import turtle

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

# -------------------------------------------------------------
# 1. ENVIRONMENT & SCREEN SETUP (Memory allocation for canvas)
# -------------------------------------------------------------
screen = turtle.Screen()
screen.setup(width=800, height=600)
screen.bgcolor("#1e1e24")
screen.title("Turtle Concept Lab: Variables, Loops, Functions & Motion")
screen.tracer(0)  # Disables automatic redraws; we manually control rendering

# -------------------------------------------------------------
# 2. STATE VARIABLES (Allocating memory for positions & flags)
# -------------------------------------------------------------
step_size = 5.0            # Pixels moved per tick
target_x = 0.0             # Destination X
target_y = 0.0             # Destination Y
is_moving = False          # Engine state flag

# -------------------------------------------------------------
# 3. ACTOR SETUP (Procedural sprite configuration)
# -------------------------------------------------------------
cat = turtle.Turtle()
cat.shape("triangle")      # Built-in vector shape; points towards heading
cat.color("#ff9f43")
cat.shapesize(stretch_wid=1.5, stretch_len=2.0)
cat.penup()
cat.speed(0)

# Target marker to visually show target_x and target_y
target_marker = turtle.Turtle()
target_marker.hideturtle()
target_marker.penup()
target_marker.color("#00d2d3")

# HUD Text Writer for variable state display
hud = turtle.Turtle()
hud.hideturtle()
hud.penup()
hud.color("#c8d6e5")
hud.goto(-380, 260)

# -------------------------------------------------------------
# 4. FUNCTIONS (Encapsulation of logic)
# -------------------------------------------------------------

def update_hud():
    """Renders current variable state onto the screen."""
    hud.clear()
    hud.write(
        f"Position: ({cat.xcor():.1f}, {cat.ycor():.1f}) | "
        f"Target: ({target_x:.1f}, {target_y:.1f}) | "
        f"Moving: {is_moving}",
        font=("Consolas", 11, "normal")
    )

def set_new_target(x, y):
    """Event handler function: updates target state and starts movement."""
    global target_x, target_y, is_moving
    target_x = float(x)
    target_y = float(y)
    
    # Visual marker at target coordinates
    target_marker.clear()
    target_marker.goto(target_x, target_y)
    target_marker.dot(10, "#00d2d3")
    
    # Turn the actor toward the target vector
    cat.setheading(cat.towards(target_x, target_y))
    is_moving = True
    logging.info("Target set to: (%.1f, %.1f). Movement initiated.", target_x, target_y)

def on_canvas_click(x, y):
    """Input Listener 1: Captures mouse clicks directly on coordinates."""
    set_new_target(x, y)

def ask_coordinate_input():
    """Input Listener 2: Dialog input parsing with boundary validation."""
    raw_val = screen.textinput("Target Input", "Enter X Y coordinates (e.g. 200 -150):")
    if not raw_val:
        return

    try:
        parts = raw_val.strip().split()
        if len(parts) != 2:
            raise ValueError("Input requires exactly two numbers.")
        
        tx = float(parts[0])
        ty = float(parts[1])

        # Verify within 800x600 bounds (-400 to 400 X, -300 to 300 Y)
        if -400 <= tx <= 400 and -300 <= ty <= 300:
            set_new_target(tx, ty)
        else:
            logging.warning("Input out of bounds: (%s, %s)", tx, ty)
    except ValueError as exc:
        logging.error("Failed to parse input '%s': %s", raw_val, exc)

# -------------------------------------------------------------
# 5. THE GAME LOOP (Tick execution via ontimer)
# -------------------------------------------------------------

def game_loop():
    """
    Acts as the engine loop. Runs every ~16ms (60 FPS).
    Demonstrates branching (if/else), incremental motion, and updates.
    """
    global is_moving

    if is_moving:
        # Check distance between current position and target position
        dist = cat.distance(target_x, target_y)

        if dist <= step_size:
            # Arrival branch
            cat.goto(target_x, target_y)
            is_moving = False
            target_marker.clear()
            logging.info("Destination reached: (%.1f, %.1f)", target_x, target_y)
        else:
            # Incremental motion step along the heading vector
            cat.forward(step_size)

    update_hud()
    screen.update()  # Manually flush the frame buffer to the monitor

    # Schedule next tick: 16ms = ~60 updates per second
    screen.ontimer(game_loop, 16)

# -------------------------------------------------------------
# 6. BINDINGS & EXECUTION
# -------------------------------------------------------------
screen.listen()
screen.onscreenclick(on_canvas_click)
screen.onkey(ask_coordinate_input, "space")  # Press Spacebar to type coordinates

logging.info("Starting game loop. Press SPACEBAR for text dialog or CLICK anywhere on screen.")
update_hud()
screen.update()
game_loop()

turtle.done()