import turtle
import tkinter.simpledialog as sd

# ==============================================================================
# VISUAL MEMORY MODEL: Cubby Storage Slots & Variable Pointer Tags
# ==============================================================================

class BottomLeftDialog(sd._QueryString):
    """Non-obtrusive dialog docked at the bottom-left of the window."""
    def body(self, master):
        canvas = master
        root = canvas.winfo_toplevel()
        root.update()
        rx = root.winfo_rootx()
        ry = root.winfo_rooty()
        rh = root.winfo_height()
        self.geometry(f"+{rx + 30}+{ry + rh - 195}")
        return super().body(master)

def prompt_bottom_left(title, prompt):
    canvas = turtle.Screen().getcanvas()
    d = BottomLeftDialog(title, prompt, parent=canvas)
    return d.result

def wait_step(screen, step_label=""):
    screen.update()
    prompt_bottom_left("Step Progression", f"Press Enter / OK to continue:\n{step_label}")

def draw_text(t, text, x, y, size=16, color="white", align="left", font="Courier"):
    t.penup()
    t.goto(x, y)
    t.color(color)
    t.write(text, align=align, font=(font, size, "bold"))

def draw_box(t, x, y, w, h, border_color="white", fill_color="#333333", border_width=2):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.pensize(border_width)
    t.color(border_color, fill_color)
    t.begin_fill()
    for _ in range(2):
        t.forward(w)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()
    t.penup()

def draw_arrow(t, start_x, start_y, end_x, end_y, color="#ff79c6", dashed=False):
    t.penup()
    t.goto(start_x, start_y)
    t.color(color)
    t.pendown()
    t.pensize(3)
    t.goto(end_x, end_y)
    t.setheading(t.towards(end_x, end_y))
    t.stamp()
    t.penup()

def draw_memory_locker(t, x, y, addr, label, is_active=False):
    """Draws an intuitive physical memory slot / locker with an address header."""
    border = "#50fa7b" if is_active else "#44475a"
    bg = "#1f382b" if is_active else "#1c1e26"
    draw_box(t, x, y, 175, 70, border_color=border, fill_color=bg, border_width=2)
    # Slot Address label (locker tag)
    draw_box(t, x, y + 48, 175, 22, border_color=border, fill_color="#282a36", border_width=1)
    draw_text(t, f"LOC: {addr}", x + 10, y + 51, size=9, color="#8be9fd", font="Courier")
    # Subtitle placeholder
    if label:
        draw_text(t, label, x + 118, y + 51, size=9, color="#6272a4", font="Arial", align="center")

def main():
    screen = turtle.Screen()
    screen.title("Python Anatomy: Variables, Values, Work, and Memory")
    screen.setup(width=1000, height=720)
    screen.bgcolor("#1e1e2e")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.speed(0)

    # -------------------------------------------------------------
    # 0. HEADER & STAGE SETUP
    # -------------------------------------------------------------
    draw_text(t, "HOW VARIABLES & MEMORY WORK IN PYTHON", 0, 305, size=18, color="#f1fa8c", align="center", font="Arial")
    draw_text(t, "Variables are Name Tags. Memory (RAM) is a Rack of Storage Lockers.", 0, 280, size=12, color="#8be9fd", align="center", font="Arial")

    # Left Column: Script / Program Code
    draw_box(t, -470, -180, 410, 440, border_color="#6272a4", fill_color="#282a36")
    draw_text(t, "CODE WORKSPACE", -450, 230, size=13, color="#bd93f9", font="Arial")
    draw_text(t, "(Instructions run line-by-line)", -450, 210, size=10, color="#6272a4", font="Arial")

    # Right Column: Computer RAM (Memory Locker Rack)
    draw_box(t, -30, -180, 480, 440, border_color="#6272a4", fill_color="#181a20")
    draw_text(t, "COMPUTER MEMORY (RAM LOCKERS)", 0, 230, size=13, color="#50fa7b", font="Arial")
    draw_text(t, "Name Tags (Labels)", 0, 205, size=11, color="#8be9fd", font="Arial")
    draw_text(t, "Physical Memory Slots & Values", 210, 205, size=11, color="#ffb86c", font="Arial")

    # Pre-draw background memory slots (empty storage rack)
    slots = [
        (200, 115, "0x101"),
        (200, 30,  "0x102"),
        (200, -55, "0x103"),
        (200, -140,"0x104")
    ]
    for sx, sy, saddr in slots:
        draw_memory_locker(t, sx, sy, saddr, "[EMPTY]")

    wait_step(screen, "Step 1: Defining variable (score = 10)")

    # -------------------------------------------------------------
    # 1. DEFINE & ASSIGN (score = 10)
    # -------------------------------------------------------------
    draw_text(t, "# 1. Create label & store 10", -450, 175, size=11, color="#6272a4", font="Courier")
    draw_text(t, "score", -450, 140, size=22, color="#8be9fd")
    draw_text(t, "=", -350, 140, size=22, color="#ff79c6")
    draw_text(t, "10", -310, 140, size=22, color="#50fa7b")

    draw_text(t, "^ label", -450, 118, size=10, color="#8be9fd", font="Arial")
    draw_text(t, "^ put into", -360, 118, size=10, color="#ff79c6", font="Arial")
    draw_text(t, "^ value", -310, 118, size=10, color="#50fa7b", font="Arial")

    # Activate Locker 0x101
    draw_memory_locker(t, 200, 115, "0x101", "int object", is_active=True)
    draw_text(t, "10", 270, 126, size=22, color="#50fa7b")

    # Variable Name Tag
    draw_box(t, 0, 125, 110, 45, border_color="#8be9fd", fill_color="#282a36")
    draw_text(t, "score", 15, 137, size=14, color="#8be9fd")

    # Connection line / wire from Tag to Locker
    draw_arrow(t, 115, 148, 195, 148, color="#ff79c6")

    wait_step(screen, "Step 2: Defining another variable (bonus = 5)")

    # -------------------------------------------------------------
    # 2. DEFINE & ASSIGN (bonus = 5)
    # -------------------------------------------------------------
    draw_text(t, "# 2. Another independent locker", -450, 75, size=11, color="#6272a4", font="Courier")
    draw_text(t, "bonus", -450, 40, size=22, color="#8be9fd")
    draw_text(t, "=", -350, 40, size=22, color="#ff79c6")
    draw_text(t, "5", -310, 40, size=22, color="#50fa7b")

    # Activate Locker 0x102
    draw_memory_locker(t, 200, 30, "0x102", "int object", is_active=True)
    draw_text(t, "5", 280, 41, size=22, color="#50fa7b")

    # Tag for bonus
    draw_box(t, 0, 40, 110, 45, border_color="#8be9fd", fill_color="#282a36")
    draw_text(t, "bonus", 15, 52, size=14, color="#8be9fd")

    draw_arrow(t, 115, 63, 195, 63, color="#ff79c6")

    wait_step(screen, "Step 3: Doing work with variables (total = score + bonus)")

    # -------------------------------------------------------------
    # 3. DOING WORK (total = score + bonus)
    # -------------------------------------------------------------
    draw_text(t, "# 3. Read values -> Calculate -> Store", -450, -20, size=11, color="#6272a4", font="Courier")
    draw_text(t, "total = score + bonus", -450, -55, size=16, color="#f8f8f2")
    draw_text(t, "CPU looks up Locker 0x101 (10)", -450, -82, size=10, color="#8be9fd", font="Courier")
    draw_text(t, "CPU looks up Locker 0x102 (5)", -450, -100, size=10, color="#8be9fd", font="Courier")
    draw_text(t, "Result (15) stored in new Locker!", -450, -118, size=10, color="#f1fa8c", font="Courier")

    # Activate Locker 0x103
    draw_memory_locker(t, 200, -55, "0x103", "int object", is_active=True)
    draw_text(t, "15", 270, -44, size=22, color="#f1fa8c")

    # Tag for total
    draw_box(t, 0, -45, 110, 45, border_color="#8be9fd", fill_color="#282a36")
    draw_text(t, "total", 15, -33, size=14, color="#8be9fd")

    draw_arrow(t, 115, -22, 195, -22, color="#ff79c6")

    wait_step(screen, "Step 4: Updating a variable (score = score + 20)")

    # -------------------------------------------------------------
    # 4. RE-ASSIGNING (score = score + 20)
    # -------------------------------------------------------------
    draw_text(t, "# 4. Update score", -450, -145, size=11, color="#6272a4", font="Courier")
    draw_text(t, "score = score + 20", -450, -172, size=16, color="#ffb86c")

    # Store 30 into Locker 0x104
    draw_memory_locker(t, 200, -140, "0x104", "int object", is_active=True)
    draw_text(t, "30", 270, -129, size=22, color="#ffb86c")

    # Re-wire arrow from score to 0x104
    draw_arrow(t, 115, 140, 195, -105, color="#ff5555")

    # De-emphasize old Locker 0x101 with cross
    t.penup()
    t.goto(220, 125)
    t.pendown()
    t.color("#ff5555")
    t.pensize(3)
    t.goto(350, 175)
    t.penup()
    t.goto(350, 125)
    t.pendown()
    t.goto(220, 175)
    t.penup()

    draw_text(t, "Old link cut!", 235, 100, size=9, color="#ff5555", font="Arial")

    # -------------------------------------------------------------
    # 5. TERMINAL OUTPUT & SUMMARY TAKEAWAYS
    # -------------------------------------------------------------
    # Terminal Console (Bottom Right)
    draw_box(t, -30, -325, 480, 75, border_color="#50fa7b", fill_color="#101018")
    draw_text(t, "TERMINAL OUTPUT:", -15, -265, size=11, color="#8be9fd", font="Arial")
    draw_text(t, ">>> print(score, total)", -15, -290, size=14, color="#ffffff", font="Courier")
    draw_text(t, "30  15", -15, -315, size=16, color="#50fa7b", font="Courier")

    # Takeaways (Bottom Left)
    draw_text(t, "KEY TAKEAWAYS FOR LEARNERS:", -470, -215, size=12, color="#f1fa8c", font="Arial")
    draw_text(t, "- Variable names are reusable tags/labels.", -470, -240, size=11, color="#f8f8f2", font="Arial")
    draw_text(t, "- Memory (RAM) has unique locker addresses (0x101, 0x102...).", -470, -265, size=11, color="#f8f8f2", font="Arial")
    draw_text(t, "- Updating a variable points its tag to a new locker location.", -470, -290, size=11, color="#f8f8f2", font="Arial")

    screen.update()
    prompt_bottom_left("Complete", "Variables & Memory Storage Walkthrough complete!\nPress Enter / OK to close.")

if __name__ == "__main__":
    main()
