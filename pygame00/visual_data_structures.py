import sys
import pygame

# Initialize pygame
pygame.init()
pygame.font.init()

# Window Configuration
SCREEN_WIDTH = 1100
SCREEN_HEIGHT = 750
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Visual Data Structures & Loops: Variables -> List -> Dict -> Object")
clock = pygame.time.Clock()

# Palettes (Clean Dracula / Cyberpunk dark theme)
BG_COLOR = (26, 27, 38)
PANEL_BG = (36, 40, 59)
PANEL_BORDER = (65, 72, 104)
TEXT_WHITE = (240, 246, 252)
TEXT_MUTED = (122, 132, 160)
ACCENT_CYAN = (125, 207, 255)
ACCENT_GREEN = (158, 206, 106)
ACCENT_YELLOW = (224, 175, 104)
ACCENT_PINK = (247, 118, 142)
ACCENT_PURPLE = (187, 154, 247)
ACCENT_ORANGE = (255, 158, 100)

# Fonts
font_title = pygame.font.SysFont("Arial", 22, bold=True)
font_heading = pygame.font.SysFont("Arial", 16, bold=True)
font_body = pygame.font.SysFont("Arial", 14)
font_code = pygame.font.SysFont("Courier New", 15, bold=True)
font_code_small = pygame.font.SysFont("Courier New", 13)
font_badge = pygame.font.SysFont("Arial", 11, bold=True)

# Step definitions
STEPS = [
    {
        "id": 0,
        "title": "Stage 1: Loose Variables (Unorganized Items)",
        "subtitle": "Multiple independent variables scattered in memory. Notice how hard it is to loop over them!",
        "code_lines": [
            "# 3 loose variables describing a character",
            "name = 'Rex'",
            "health = 100",
            "speed = 5",
            "",
            "# Problem: How do you loop through these?",
            "# You CANNOT easily loop over loose variable names!",
            "# If you have 50 characters, you need 150 variables!"
        ],
        "takeaway": "Variables hold single values. But with multiple attributes or characters, loose variables become impossible to loop over or pass cleanly."
    },
    {
        "id": 1,
        "title": "Stage 2: The List [] (Ordered Train Cars)",
        "subtitle": "Packing items sequentially into indexed slots. Now we can easily LOOP with 'for item in list' or indices!",
        "code_lines": [
            "# Packed in order into a List:",
            "pet_list = ['Rex', 100, 5]",
            "",
            "# Now we can LOOP over values effortlessly!",
            "for index, val in enumerate(pet_list):",
            "    print(f'Index [{index}] -> {val}')",
            "",
            "# But what does pet_list[2] mean? Speed? Age? Level?",
            "# Lists have order, but NO descriptive key names!"
        ],
        "takeaway": "Lists are perfect for ordering and looping with indices [0, 1, 2], but they don't explain what each field means."
    },
    {
        "id": 2,
        "title": "Stage 3: The Dictionary {} (Labeled Drawers)",
        "subtitle": "Each value gets its own labeled Key. We can loop over keys, values, or both!",
        "code_lines": [
            "# Key-Value pairs: labeled compartments!",
            "pet_dict = {",
            "    'name': 'Rex',",
            "    'health': 100,",
            "    'speed': 5",
            "}",
            "",
            "# Looping over dictionary pairs:",
            "for key, val in pet_dict.items():",
            "    print(f'{key}: {val}')",
            "",
            "# Great organization! But how does Rex walk or take damage?"
        ],
        "takeaway": "Dictionaries give every item a clear label (key: value) and support key-value loops, but data is purely passive—no built-in behavior."
    },
    {
        "id": 3,
        "title": "Stage 4: Objects with Methods (Data + Smart Behaviors)",
        "subtitle": "Attributes (variables) + Methods (functions) bundled together inside a live entity.",
        "code_lines": [
            "class Pet:",
            "    def __init__(self, name, health, speed):",
            "        self.name = name        # Attribute",
            "        self.health = health    # Attribute",
            "        self.speed = speed      # Attribute",
            "",
            "    def take_damage(self, amount):   # Method",
            "        self.health -= amount",
            "",
            "    def heal(self, amount):          # Method",
            "        self.health += amount",
            "",
            "# Party of pets: Loop over objects and call their methods!",
            "party = [Pet('Rex', 100, 5), Pet('Luna', 80, 7)]",
            "for p in party:",
            "    p.take_damage(15)"
        ],
        "takeaway": "Objects bundle state (attributes) AND actions (methods). You can loop through a list of objects and trigger behaviors on each!"
    }
]

# Interactive live object for Stage 4 demonstration
class InteractivePet:
    def __init__(self, name, health, speed, color):
        self.name = name
        self.health = health
        self.speed = speed
        self.color = color
        self.action_log = "Spawned"

    def take_damage(self, amount):
        self.health = max(0, self.health - amount)
        self.action_log = f"-{amount} HP (Took Damage!)"

    def heal(self, amount):
        self.health = min(120, self.health + amount)
        self.action_log = f"+{amount} HP (Healed!)"

current_step = 0
party_demo = [
    InteractivePet("Rex", 100, 5, ACCENT_CYAN),
    InteractivePet("Luna", 80, 8, ACCENT_PINK),
    InteractivePet("Milo", 95, 6, ACCENT_YELLOW)
]

# UI Button Helper
class Button:
    def __init__(self, rect, text, bg, fg, border=None):
        self.rect = pygame.Rect(rect)
        self.text = text
        self.bg = bg
        self.fg = fg
        self.border = border or bg

    def draw(self, surf, mouse_pos):
        hover = self.rect.collidepoint(mouse_pos)
        color = (min(255, self.bg[0] + 25), min(255, self.bg[1] + 25), min(255, self.bg[2] + 25)) if hover else self.bg
        pygame.draw.rect(surf, color, self.rect, border_radius=8)
        pygame.draw.rect(surf, self.border, self.rect, width=2, border_radius=8)
        txt = font_body.render(self.text, True, self.fg)
        txt_rect = txt.get_rect(center=self.rect.center)
        surf.blit(txt, txt_rect)

    def is_clicked(self, event):
        return event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 and self.rect.collidepoint(event.pos)


btn_prev = Button((30, 680, 140, 42), "< Previous", PANEL_BG, TEXT_WHITE, PANEL_BORDER)
btn_next = Button((190, 680, 140, 42), "Next Stage >", ACCENT_CYAN, BG_COLOR)

btn_damage = Button((740, 680, 150, 42), "Damage Party (-15)", (68, 30, 45), ACCENT_PINK, ACCENT_PINK)
btn_heal = Button((910, 680, 150, 42), "Heal Party (+10)", (30, 58, 45), ACCENT_GREEN, ACCENT_GREEN)


def draw_header():
    # Top banner
    hdr_rect = pygame.Rect(30, 15, SCREEN_WIDTH - 60, 70)
    pygame.draw.rect(screen, PANEL_BG, hdr_rect, border_radius=10)
    pygame.draw.rect(screen, PANEL_BORDER, hdr_rect, width=2, border_radius=10)

    step_info = STEPS[current_step]
    t_surf = font_title.render(step_info["title"], True, ACCENT_YELLOW)
    screen.blit(t_surf, (hdr_rect.x + 20, hdr_rect.y + 12))

    s_surf = font_body.render(step_info["subtitle"], True, TEXT_WHITE)
    screen.blit(s_surf, (hdr_rect.x + 20, hdr_rect.y + 40))

    # Stepper dots on the right
    for i in range(len(STEPS)):
        cx = hdr_rect.right - 100 + (i * 22)
        cy = hdr_rect.centery
        color = ACCENT_CYAN if i == current_step else PANEL_BORDER
        pygame.draw.circle(screen, color, (cx, cy), 7 if i == current_step else 5)


def draw_code_panel():
    panel_rect = pygame.Rect(30, 100, 460, 560)
    pygame.draw.rect(screen, PANEL_BG, panel_rect, border_radius=10)
    pygame.draw.rect(screen, PANEL_BORDER, panel_rect, width=2, border_radius=10)

    # Title
    lbl = font_heading.render("PYTHON SYNTAX & LOGIC", True, ACCENT_CYAN)
    screen.blit(lbl, (panel_rect.x + 20, panel_rect.y + 16))
    pygame.draw.line(screen, PANEL_BORDER, (panel_rect.x + 15, panel_rect.y + 45), (panel_rect.right - 15, panel_rect.y + 45), 1)

    # Code lines
    step_info = STEPS[current_step]
    y = panel_rect.y + 60
    for line in step_info["code_lines"]:
        color = TEXT_MUTED if line.strip().startswith("#") else TEXT_WHITE
        if "class " in line or "def " in line:
            color = ACCENT_PURPLE
        elif "for " in line or " in " in line:
            color = ACCENT_PINK
        elif " = " in line:
            color = ACCENT_YELLOW
        txt = font_code.render(line, True, color)
        screen.blit(txt, (panel_rect.x + 20, y))
        y += 24

    # Pedagogical Takeaway Box at bottom of code panel
    box_rect = pygame.Rect(panel_rect.x + 15, panel_rect.bottom - 110, panel_rect.width - 30, 95)
    pygame.draw.rect(screen, (24, 27, 40), box_rect, border_radius=8)
    pygame.draw.rect(screen, ACCENT_PURPLE, box_rect, width=1, border_radius=8)

    t_lbl = font_badge.render("KEY CONCEPT:", True, ACCENT_PURPLE)
    screen.blit(t_lbl, (box_rect.x + 12, box_rect.y + 8))

    # Multi-line wrap for takeaway
    words = step_info["takeaway"].split(" ")
    cur_line = ""
    ty = box_rect.y + 26
    for word in words:
        test_line = cur_line + (" " if cur_line else "") + word
        if font_body.size(test_line)[0] < box_rect.width - 24:
            cur_line = test_line
        else:
            screen.blit(font_body.render(cur_line, True, TEXT_WHITE), (box_rect.x + 12, ty))
            ty += 18
            cur_line = word
    if cur_line:
        screen.blit(font_body.render(cur_line, True, TEXT_WHITE), (box_rect.x + 12, ty))


def draw_visual_stage():
    stage_rect = pygame.Rect(510, 100, 560, 560)
    pygame.draw.rect(screen, PANEL_BG, stage_rect, border_radius=10)
    pygame.draw.rect(screen, PANEL_BORDER, stage_rect, width=2, border_radius=10)

    lbl = font_heading.render("INTERACTIVE DATA PACKING MODEL", True, ACCENT_GREEN)
    screen.blit(lbl, (stage_rect.x + 20, stage_rect.y + 16))
    pygame.draw.line(screen, PANEL_BORDER, (stage_rect.x + 15, stage_rect.y + 45), (stage_rect.right - 15, stage_rect.y + 45), 1)

    if current_step == 0:
        # STAGE 1: Loose Variables
        sub = font_body.render("Loose, detached items with no shared container:", True, TEXT_MUTED)
        screen.blit(sub, (stage_rect.x + 25, stage_rect.y + 65))

        items = [
            ("name", "'Rex'", ACCENT_CYAN, 120),
            ("health", "100", ACCENT_GREEN, 240),
            ("speed", "5", ACCENT_YELLOW, 360)
        ]
        for var_name, val, color, y_pos in items:
            box = pygame.Rect(stage_rect.x + 60, stage_rect.y + y_pos, 420, 80)
            pygame.draw.rect(screen, (28, 31, 46), box, border_radius=10)
            pygame.draw.rect(screen, color, box, width=2, border_radius=10)

            # Name tag
            tag_rect = pygame.Rect(box.x + 15, box.y + 15, 110, 50)
            pygame.draw.rect(screen, PANEL_BG, tag_rect, border_radius=6)
            pygame.draw.rect(screen, color, tag_rect, width=1, border_radius=6)
            t_render = font_heading.render(var_name, True, color)
            screen.blit(t_render, t_render.get_rect(center=tag_rect.center))

            # Assignment arrow
            eq = font_title.render("=", True, TEXT_WHITE)
            screen.blit(eq, (box.x + 145, box.y + 26))

            # Value cell
            val_rect = pygame.Rect(box.x + 190, box.y + 15, 200, 50)
            pygame.draw.rect(screen, (18, 20, 30), val_rect, border_radius=6)
            val_txt = font_title.render(val, True, TEXT_WHITE)
            screen.blit(val_txt, val_txt.get_rect(center=val_rect.center))

        # Problem banner at bottom
        warn_box = pygame.Rect(stage_rect.x + 30, stage_rect.y + 470, stage_rect.width - 60, 60)
        pygame.draw.rect(screen, (50, 30, 40), warn_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_PINK, warn_box, width=1, border_radius=8)
        warn_txt = font_body.render("Limitation: Cannot iterate over these with a 'for' loop!", True, ACCENT_PINK)
        screen.blit(warn_txt, (warn_box.x + 20, warn_box.y + 20))

    elif current_step == 1:
        # STAGE 2: List []
        sub = font_body.render("Ordered Train Cars (Indexed 0, 1, 2). Loopable by index or item:", True, TEXT_MUTED)
        screen.blit(sub, (stage_rect.x + 25, stage_rect.y + 65))

        # Big List Container
        cont_rect = pygame.Rect(stage_rect.x + 35, stage_rect.y + 120, 490, 160)
        pygame.draw.rect(screen, (24, 27, 40), cont_rect, border_radius=12)
        pygame.draw.rect(screen, ACCENT_CYAN, cont_rect, width=3, border_radius=12)

        hdr = font_heading.render("pet_list = [  ...  ]", True, ACCENT_CYAN)
        screen.blit(hdr, (cont_rect.x + 20, cont_rect.y + 15))

        list_elements = [
            (0, "'Rex'", ACCENT_CYAN),
            (1, "100", ACCENT_GREEN),
            (2, "5", ACCENT_YELLOW)
        ]
        slot_w = 120
        start_x = cont_rect.x + 30
        for idx, val, color in list_elements:
            sx = start_x + (idx * 150)
            sy = cont_rect.y + 55
            # Slot
            slot_rect = pygame.Rect(sx, sy, slot_w, 80)
            pygame.draw.rect(screen, PANEL_BG, slot_rect, border_radius=8)
            pygame.draw.rect(screen, color, slot_rect, width=2, border_radius=8)

            # Index Badge
            idx_badge = pygame.Rect(sx, sy - 18, 55, 18)
            pygame.draw.rect(screen, color, idx_badge, border_radius=4)
            badge_txt = font_badge.render(f"Index [{idx}]", True, BG_COLOR)
            screen.blit(badge_txt, badge_txt.get_rect(center=idx_badge.center))

            v_txt = font_title.render(val, True, TEXT_WHITE)
            screen.blit(v_txt, v_txt.get_rect(center=slot_rect.center))

        # Loop demonstration box
        loop_box = pygame.Rect(stage_rect.x + 35, stage_rect.y + 320, 490, 190)
        pygame.draw.rect(screen, (20, 24, 34), loop_box, border_radius=10)
        pygame.draw.rect(screen, ACCENT_PINK, loop_box, width=2, border_radius=10)

        ltitle = font_heading.render("WHAT THE LOOP SEES EACH ITERATION:", True, ACCENT_PINK)
        screen.blit(ltitle, (loop_box.x + 20, loop_box.y + 16))

        iter_lines = [
            "Loop Iteration 1 -> Index 0: val = 'Rex'",
            "Loop Iteration 2 -> Index 1: val = 100",
            "Loop Iteration 3 -> Index 2: val = 5"
        ]
        iy = loop_box.y + 55
        for l in iter_lines:
            pygame.draw.circle(screen, ACCENT_PINK, (loop_box.x + 30, iy + 10), 4)
            screen.blit(font_code.render(l, True, TEXT_WHITE), (loop_box.x + 45, iy))
            iy += 35

        mystery = font_body.render("Notice: 'pet_list[2]' gives 5, but what does 5 mean?", True, ACCENT_YELLOW)
        screen.blit(mystery, (loop_box.x + 20, loop_box.y + 155))

    elif current_step == 2:
        # STAGE 3: Dictionary {}
        sub = font_body.render("Labeled Drawers with Key-Value pairings:", True, TEXT_MUTED)
        screen.blit(sub, (stage_rect.x + 25, stage_rect.y + 60))

        # Dict Container
        cont_rect = pygame.Rect(stage_rect.x + 35, stage_rect.y + 100, 490, 250)
        pygame.draw.rect(screen, (24, 27, 40), cont_rect, border_radius=12)
        pygame.draw.rect(screen, ACCENT_YELLOW, cont_rect, width=3, border_radius=12)

        hdr = font_heading.render("pet_dict = {  'key': value  }", True, ACCENT_YELLOW)
        screen.blit(hdr, (cont_rect.x + 20, cont_rect.y + 15))

        dict_items = [
            ("'name'", "'Rex'", ACCENT_CYAN, 55),
            ("'health'", "100", ACCENT_GREEN, 115),
            ("'speed'", "5", ACCENT_YELLOW, 175)
        ]
        for key, val, color, y_off in dict_items:
            # Key compartment
            k_rect = pygame.Rect(cont_rect.x + 30, cont_rect.y + y_off, 180, 45)
            pygame.draw.rect(screen, PANEL_BG, k_rect, border_radius=6)
            pygame.draw.rect(screen, color, k_rect, width=2, border_radius=6)
            k_txt = font_heading.render(key, True, color)
            screen.blit(k_txt, k_txt.get_rect(center=k_rect.center))

            colon = font_title.render(":", True, TEXT_WHITE)
            screen.blit(colon, (cont_rect.x + 225, cont_rect.y + y_off + 8))

            # Value compartment
            v_rect = pygame.Rect(cont_rect.x + 255, cont_rect.y + y_off, 190, 45)
            pygame.draw.rect(screen, (18, 20, 30), v_rect, border_radius=6)
            v_txt = font_title.render(val, True, TEXT_WHITE)
            screen.blit(v_txt, v_txt.get_rect(center=v_rect.center))

        # Dictionary Loop Types Box
        loop_box = pygame.Rect(stage_rect.x + 35, stage_rect.y + 370, 490, 160)
        pygame.draw.rect(screen, (20, 24, 34), loop_box, border_radius=10)
        pygame.draw.rect(screen, ACCENT_PURPLE, loop_box, width=2, border_radius=10)

        ltitle = font_heading.render("POWERFUL DICTIONARY LOOPS:", True, ACCENT_PURPLE)
        screen.blit(ltitle, (loop_box.x + 20, loop_box.y + 15))

        loop_types = [
            ("for k in pet_dict.keys():", "-> 'name', 'health', 'speed'"),
            ("for v in pet_dict.values():", "-> 'Rex', 100, 5"),
            ("for k, v in pet_dict.items():", "-> both label and data together!")
        ]
        ly = loop_box.y + 48
        for code_str, desc in loop_types:
            c_surf = font_code_small.render(code_str, True, ACCENT_YELLOW)
            d_surf = font_body.render(desc, True, TEXT_WHITE)
            screen.blit(c_surf, (loop_box.x + 20, ly))
            screen.blit(d_surf, (loop_box.x + 250, ly))
            ly += 32

    elif current_step == 3:
        # STAGE 4: Objects with Methods
        sub = font_body.render("Living Entities: Attributes (Data) + Methods (Callable Actions):", True, TEXT_MUTED)
        screen.blit(sub, (stage_rect.x + 25, stage_rect.y + 55))

        # Draw party cards (List of Objects)
        card_w = 160
        start_x = stage_rect.x + 25
        for i, pet in enumerate(party_demo):
            cx = start_x + (i * 175)
            cy = stage_rect.y + 90
            card_rect = pygame.Rect(cx, cy, card_w, 290)

            # Capsule background
            pygame.draw.rect(screen, (24, 27, 40), card_rect, border_radius=12)
            pygame.draw.rect(screen, pet.color, card_rect, width=2, border_radius=12)

            # Header / Name
            hdr_badge = pygame.Rect(card_rect.x, card_rect.y, card_w, 40)
            pygame.draw.rect(screen, pet.color, hdr_badge, border_top_left_radius=12, border_top_right_radius=12)
            p_name = font_heading.render(f"Pet: {pet.name}", True, BG_COLOR)
            screen.blit(p_name, p_name.get_rect(center=hdr_badge.center))

            # Attributes Box
            ay = card_rect.y + 55
            screen.blit(font_badge.render("ATTRIBUTES (STATE):", True, TEXT_MUTED), (card_rect.x + 12, ay))
            ay += 20
            # Health bar
            screen.blit(font_body.render(f"HP: {pet.health}", True, TEXT_WHITE), (card_rect.x + 12, ay))
            bar_w = card_w - 24
            bar_bg = pygame.Rect(card_rect.x + 12, ay + 20, bar_w, 10)
            pygame.draw.rect(screen, (40, 44, 60), bar_bg, border_radius=4)
            pct = max(0.0, min(1.0, pet.health / 100.0))
            bar_fg = pygame.Rect(card_rect.x + 12, ay + 20, int(bar_w * pct), 10)
            pygame.draw.rect(screen, ACCENT_GREEN if pet.health > 40 else ACCENT_PINK, bar_fg, border_radius=4)

            ay += 40
            screen.blit(font_body.render(f"Speed: {pet.speed}", True, TEXT_WHITE), (card_rect.x + 12, ay))

            # Divider
            ay += 30
            pygame.draw.line(screen, PANEL_BORDER, (card_rect.x + 10, ay), (card_rect.right - 10, ay), 1)

            # Methods Box
            ay += 12
            screen.blit(font_badge.render("METHODS (ACTIONS):", True, ACCENT_PURPLE), (card_rect.x + 12, ay))
            ay += 22
            m1 = font_code_small.render(".take_damage()", True, ACCENT_PINK)
            m2 = font_code_small.render(".heal()", True, ACCENT_GREEN)
            screen.blit(m1, (card_rect.x + 12, ay))
            screen.blit(m2, (card_rect.x + 12, ay + 22))

            # Live Log
            ay += 50
            log_rect = pygame.Rect(card_rect.x + 8, ay, card_w - 16, 26)
            pygame.draw.rect(screen, (15, 18, 25), log_rect, border_radius=4)
            log_txt = font_badge.render(pet.action_log, True, ACCENT_YELLOW)
            screen.blit(log_txt, log_txt.get_rect(center=log_rect.center))

        # Bottom Loop Control Explanation
        ctrl_rect = pygame.Rect(stage_rect.x + 25, stage_rect.y + 400, 505, 135)
        pygame.draw.rect(screen, (20, 24, 34), ctrl_rect, border_radius=10)
        pygame.draw.rect(screen, ACCENT_GREEN, ctrl_rect, width=2, border_radius=10)

        ctitle = font_heading.render("LOOPING OVER OBJECTS & CALLING METHODS:", True, ACCENT_GREEN)
        screen.blit(ctitle, (ctrl_rect.x + 18, ctrl_rect.y + 14))

        cl1 = font_code.render("for pet in party:", True, ACCENT_YELLOW)
        cl2 = font_code.render("    pet.take_damage(15)  # Or pet.heal(10)", True, TEXT_WHITE)
        screen.blit(cl1, (ctrl_rect.x + 25, ctrl_rect.y + 45))
        screen.blit(cl2, (ctrl_rect.x + 25, ctrl_rect.y + 72))

        c_hint = font_body.render("Click the action buttons below to run the loop on the party!", True, ACCENT_CYAN)
        screen.blit(c_hint, (ctrl_rect.x + 18, ctrl_rect.y + 105))


def main():
    global current_step
    running = True

    while running:
        mouse_pos = pygame.mouse.get_pos()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RIGHT or event.key == pygame.K_SPACE:
                    current_step = min(len(STEPS) - 1, current_step + 1)
                elif event.key == pygame.K_LEFT:
                    current_step = max(0, current_step - 1)

            # Navigation buttons
            if btn_next.is_clicked(event):
                current_step = min(len(STEPS) - 1, current_step + 1)
            elif btn_prev.is_clicked(event):
                current_step = max(0, current_step - 1)

            # Interactive Object Loop Actions (Stage 4)
            if current_step == 3:
                if btn_damage.is_clicked(event):
                    # Loop over list of objects and trigger method!
                    for pet in party_demo:
                        pet.take_damage(15)
                elif btn_heal.is_clicked(event):
                    for pet in party_demo:
                        pet.heal(10)

        # Render Frame
        screen.fill(BG_COLOR)
        draw_header()
        draw_code_panel()
        draw_visual_stage()

        # Draw Nav Buttons
        btn_prev.draw(screen, mouse_pos)
        btn_next.draw(screen, mouse_pos)

        # Draw Method Loop buttons if on stage 4
        if current_step == 3:
            btn_damage.draw(screen, mouse_pos)
            btn_heal.draw(screen, mouse_pos)

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()
