import turtle
import tkinter.simpledialog as sd

# ==============================================================================
# VISUAL SYNTAX: Teaching the print() function components visually!
# ==============================================================================

def setup_screen():
    screen = turtle.Screen()
    screen.title("Visual Syntax: The print() function")
    screen.setup(width=900, height=650)
    screen.bgcolor("#2b2b2b") # Dark Theme
    return screen

def draw_text(t, text, x, y, size=36, color="white"):
    """Helper to draw text easily at specific coordinates."""
    t.penup()
    t.goto(x, y)
    t.color(color)
    t.write(text, align="left", font=("Courier", size, "bold"))

def draw_annotation(t, text, start_x, start_y, end_x, end_y, color):
    """Draws a vertical pointing line and positions explanation text clearly below the line."""
    t.penup()
    t.goto(start_x, start_y)
    t.color(color)
    t.pendown()
    t.pensize(2)
    t.goto(end_x, end_y)
    t.penup()
    t.goto(end_x, end_y - 35)
    t.write(text, align="center", font=("Arial", 11, "bold"))

def draw_bracket_bottom(t, text, x1, x2, y, color):
    """Draws a bracket under components and places explanation text with clean clearance."""
    t.penup()
    t.goto(x1, y)
    t.color(color)
    t.pendown()
    t.pensize(2)
    t.goto(x1, y - 35)
    t.goto(x2, y - 35)
    t.goto(x2, y)
    t.penup()
    t.goto((x1 + x2) / 2, y - 75)
    t.write(text, align="center", font=("Arial", 11, "bold"))

def draw_bracket_top(t, text, x1, x2, y, color):
    """Draws a bracket above components and places explanation text above the bracket."""
    t.penup()
    t.goto(x1, y)
    t.color(color)
    t.pendown()
    t.pensize(2)
    t.goto(x1, y + 35)
    t.goto(x2, y + 35)
    t.goto(x2, y)
    t.penup()
    t.goto((x1 + x2) / 2, y + 45)
    t.write(text, align="center", font=("Arial", 11, "bold"))

class BottomLeftDialog(sd._QueryString):
    """Custom prompt dialog that docks non-obtrusively to the bottom-left of the window."""
    def body(self, master):
        canvas = master
        root = canvas.winfo_toplevel()
        root.update()
        rx = root.winfo_rootx()
        ry = root.winfo_rooty()
        rh = root.winfo_height()
        # Position near bottom-left of the turtle window
        self.geometry(f"+{rx + 30}+{ry + rh - 170}")
        return super().body(master)

def prompt_bottom_left(title, prompt):
    """Opens a string prompt positioned at the bottom left."""
    canvas = turtle.Screen().getcanvas()
    d = BottomLeftDialog(title, prompt, parent=canvas)
    return d.result

def wait_step(screen):
    """Pauses the animation so the student/teacher controls each step from bottom-left."""
    screen.update()
    prompt_bottom_left("Next Step", "Press Enter / OK to continue:")

def main():
    screen = setup_screen()
    screen.tracer(0)
    t = turtle.Turtle()
    t.hideturtle()
    
    # Title
    draw_text(t, "How to speak Python: The print() statement", -370, 240, size=20, color="#f1fa8c")
    wait_step(screen)
    
    # ------------------------------------------------------------------
    # COORDINATES FOR SYNTAX COMPONENTS 
    # ------------------------------------------------------------------
    y_base = 70
    x_print = -210
    x_paren_left = -60
    x_quote_left = -30
    x_hello = 0
    x_quote_right = 180
    x_paren_right = 210
    
    # ==========================================
    # 1. The Function Name
    # ==========================================
    draw_text(t, "print", x_print, y_base, color="#8be9fd")
    draw_annotation(t, "The Function Name\n(The Command: What to do)", x_print + 55, y_base - 10, x_print + 55, y_base - 65, "#8be9fd")
    wait_step(screen)
    
    # ==========================================
    # 2. The Parentheses
    # ==========================================
    draw_text(t, "(", x_paren_left, y_base, color="#ff79c6")
    draw_text(t, ")", x_paren_right, y_base, color="#ff79c6")
    draw_bracket_bottom(t, "Parentheses\n(The Container: Holds the message)", x_paren_left + 15, x_paren_right + 15, y_base - 10, "#ff79c6")
    wait_step(screen)
    
    # ==========================================
    # 3. The Quotes
    # ==========================================
    draw_text(t, '"', x_quote_left, y_base, color="#f1fa8c")
    draw_text(t, '"', x_quote_right, y_base, color="#f1fa8c")
    draw_bracket_top(t, "Quote Marks\n(Means 'This is text')", x_quote_left + 15, x_quote_right + 15, y_base + 45, "#f1fa8c")
    wait_step(screen)
    
    # ==========================================
    # 4. The Data (String)
    # ==========================================
    draw_text(t, "Hello!", x_hello, y_base, color="#50fa7b")
    draw_annotation(t, "The String\n(The actual words to show)", x_hello + 80, y_base - 10, x_hello + 80, y_base - 145, "#50fa7b")
    wait_step(screen)
    
    # ==========================================
    # 5. The Output Console
    # ==========================================
    draw_text(t, "OUTPUT CONSOLE:", 30, -225, size=15, color="white")
    
    # Draw terminal box shifted rightward to leave room for bottom-left dialogue
    t.penup()
    t.goto(30, -295)
    t.pendown()
    t.color("black")
    t.begin_fill()
    for _ in range(2):
        t.forward(380)
        t.left(90)
        t.forward(60)
        t.left(90)
    t.end_fill()
    
    # Printed text inside terminal
    draw_text(t, "> Hello!", 45, -285, size=20, color="#ffffff")
    screen.update()
    
    # Final state
    prompt_bottom_left("Done", "Syntax complete! Press Enter / OK to exit.")

if __name__ == "__main__":
    main()
