import sys
import pygame
import json

# Initialize pygame
pygame.init()
pygame.font.init()

# Window Configuration
SCREEN_WIDTH = 1100
SCREEN_HEIGHT = 750
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Visual File Packing: Text -> JSON -> Binary -> Archives -> PLC")
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
font_hex = pygame.font.SysFont("Courier New", 14, bold=True)

# Step definitions
STEPS = [
    {
        "id": 0,
        "title": "Stage 1: Basic Text Files (.txt)",
        "subtitle": "Unstructured character data written sequentially to disk.",
        "code_lines": [
            "# Opening a file for reading",
            "file = open('log.txt', 'r')",
            "",
            "# Read it line by line",
            "for line in file:",
            "    print(line)",
            "",
            "file.close()",
            "",
            "# Data is just a flat string of characters.",
            "# The computer doesn't know what it means!"
        ],
        "takeaway": "Text files store flat sequences of human-readable characters. They are easy to read line-by-line, but the computer can't easily query or structure the data without help."
    },
    {
        "id": 1,
        "title": "Stage 2: Structured Data (JSON / CSV)",
        "subtitle": "Packing Python lists and dicts into text format so they can be saved.",
        "code_lines": [
            "import json",
            "",
            "# 1. Packing (Serialization)",
            "my_data = {'name': 'Rex', 'speed': 5}",
            "json_string = json.dumps(my_data)",
            "# Saves to disk as: {\"name\": \"Rex\", \"speed\": 5}",
            "",
            "# 2. Unpacking (Deserialization)",
            "raw_text = file.read()",
            "loaded_dict = json.loads(raw_text)",
            "",
            "# Now the computer knows 'name' is a Key!"
        ],
        "takeaway": "JSON packs our Python Dictionaries into a text string for storage. When unpacked, it reconstructs the original Dictionary so the computer understands the keys!"
    },
    {
        "id": 2,
        "title": "Stage 3: Binary Packing (Images / Audio)",
        "subtitle": "Storing raw numbers (bytes) instead of text. More efficient and compact.",
        "code_lines": [
            "# Opening a file in Binary Mode ('rb')",
            "file = open('image.bin', 'rb')",
            "byte_data = file.read()",
            "",
            "# The file contains raw hex bytes:",
            "# FF 00 00 FF 00 00 00 FF 00 ...",
            "",
            "# We need a 'Decoder' to unpack bytes",
            "# into something meaningful (like RGB Pixels).",
            "pixels = decode_rgb(byte_data)",
            "display(pixels)"
        ],
        "takeaway": "Binary files don't store letters; they store raw bytes. An image file packs pixels into hex values (e.g. FF 00 00 for Red). Software unpacks this back into a picture."
    },
    {
        "id": 3,
        "title": "Stage 4: Container Formats (.ZIP, .DWG, .DOCX)",
        "subtitle": "A single file that secretly contains a whole folder of other files!",
        "code_lines": [
            "import zipfile",
            "",
            "# Open the container package",
            "archive = zipfile.ZipFile('project.zip', 'r')",
            "",
            "# A .zip, .docx, or CAD file often packs",
            "# multiple files together:",
            "# ├── layout.xml      (Structure)",
            "# ├── texture.png     (Binary Image)",
            "# └── metadata.json   (Data)",
            "",
            "archive.extractall('extracted_folder')"
        ],
        "takeaway": "Advanced formats like Word documents, CAD files, or Game Pak files are often just zipped folders holding XML layouts, images, and data packed together into one neat file."
    },
    {
        "id": 4,
        "title": "Stage 5: Industrial Packages (PLC / Firmware)",
        "subtitle": "Compiling and packaging logic, tags, and hardware configurations.",
        "code_lines": [
            "# PLC packaging bundles code, memory mappings,",
            "# and network config into one deployment.",
            "",
            "package = PLC_Compiler.build(",
            "    logic='ladder_logic.st',",
            "    tags='memory_map.xml',",
            "    hw='io_config.hw'",
            ")",
            "",
            "# Unpacking happens on the hardware itself!",
            "PLC.receive(package)",
            "PLC.load_into_memory()",
            "PLC.run_logic()"
        ],
        "takeaway": "In industrial systems (like PLCs), 'packing' compiles everything the controller needs—logic, variables (tags), and IO setup—into one package sent over the network to run the machine."
    }
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

# State Variables for Interactivity
current_step = 0
action_state = 0 # Used for animating actions within a stage

btn_action = Button((740, 680, 150, 42), "Execute / Unpack", (30, 58, 45), ACCENT_GREEN, ACCENT_GREEN)

def draw_header():
    hdr_rect = pygame.Rect(30, 15, SCREEN_WIDTH - 60, 70)
    pygame.draw.rect(screen, PANEL_BG, hdr_rect, border_radius=10)
    pygame.draw.rect(screen, PANEL_BORDER, hdr_rect, width=2, border_radius=10)

    step_info = STEPS[current_step]
    t_surf = font_title.render(step_info["title"], True, ACCENT_YELLOW)
    screen.blit(t_surf, (hdr_rect.x + 20, hdr_rect.y + 12))

    s_surf = font_body.render(step_info["subtitle"], True, TEXT_WHITE)
    screen.blit(s_surf, (hdr_rect.x + 20, hdr_rect.y + 40))

    # Stepper dots
    for i in range(len(STEPS)):
        cx = hdr_rect.right - 120 + (i * 22)
        cy = hdr_rect.centery
        color = ACCENT_CYAN if i == current_step else PANEL_BORDER
        pygame.draw.circle(screen, color, (cx, cy), 7 if i == current_step else 5)

def draw_code_panel():
    panel_rect = pygame.Rect(30, 100, 460, 560)
    pygame.draw.rect(screen, PANEL_BG, panel_rect, border_radius=10)
    pygame.draw.rect(screen, PANEL_BORDER, panel_rect, width=2, border_radius=10)

    lbl = font_heading.render("PYTHON FILE I/O SCRIPT", True, ACCENT_CYAN)
    screen.blit(lbl, (panel_rect.x + 20, panel_rect.y + 16))
    pygame.draw.line(screen, PANEL_BORDER, (panel_rect.x + 15, panel_rect.y + 45), (panel_rect.right - 15, panel_rect.y + 45), 1)

    step_info = STEPS[current_step]
    y = panel_rect.y + 60
    for line in step_info["code_lines"]:
        color = TEXT_MUTED if line.strip().startswith("#") else TEXT_WHITE
        if "open" in line or "read" in line or "close" in line or "dumps" in line or "loads" in line or "extractall" in line:
            color = ACCENT_GREEN
        elif "import " in line or "class " in line:
            color = ACCENT_PURPLE
        elif "for " in line or " in " in line:
            color = ACCENT_PINK
        elif " = " in line:
            color = ACCENT_YELLOW
        elif "'" in line or '"' in line:
            color = ACCENT_CYAN
        txt = font_code.render(line, True, color)
        screen.blit(txt, (panel_rect.x + 20, y))
        y += 24

    box_rect = pygame.Rect(panel_rect.x + 15, panel_rect.bottom - 120, panel_rect.width - 30, 105)
    pygame.draw.rect(screen, (24, 27, 40), box_rect, border_radius=8)
    pygame.draw.rect(screen, ACCENT_PURPLE, box_rect, width=1, border_radius=8)

    t_lbl = font_badge.render("KEY CONCEPT:", True, ACCENT_PURPLE)
    screen.blit(t_lbl, (box_rect.x + 12, box_rect.y + 8))

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

    lbl = font_heading.render("INTERACTIVE PACKING / UNPACKING VIEW", True, ACCENT_GREEN)
    screen.blit(lbl, (stage_rect.x + 20, stage_rect.y + 16))
    pygame.draw.line(screen, PANEL_BORDER, (stage_rect.x + 15, stage_rect.y + 45), (stage_rect.right - 15, stage_rect.y + 45), 1)

    if current_step == 0:
        # Stage 1: Basic Text
        disk_rect = pygame.Rect(stage_rect.x + 30, stage_rect.y + 70, 200, 300)
        pygame.draw.rect(screen, (20, 20, 25), disk_rect, border_radius=8)
        pygame.draw.rect(screen, ACCENT_YELLOW, disk_rect, width=2, border_radius=8)
        screen.blit(font_heading.render("log.txt (Disk)", True, ACCENT_YELLOW), (disk_rect.x + 15, disk_rect.y + 15))

        lines = ["System started", "Error code 404", "User login ok"]
        for i, l in enumerate(lines):
            c = ACCENT_GREEN if action_state > i else TEXT_MUTED
            screen.blit(font_code.render(l, True, c), (disk_rect.x + 15, disk_rect.y + 60 + i * 30))

        mem_rect = pygame.Rect(stage_rect.x + 330, stage_rect.y + 70, 200, 300)
        pygame.draw.rect(screen, (15, 30, 40), mem_rect, border_radius=8)
        pygame.draw.rect(screen, ACCENT_CYAN, mem_rect, width=2, border_radius=8)
        screen.blit(font_heading.render("RAM Memory", True, ACCENT_CYAN), (mem_rect.x + 15, mem_rect.y + 15))
        
        for i in range(action_state):
            if i < len(lines):
                # Arrow
                pygame.draw.line(screen, ACCENT_PINK, (disk_rect.right + 10, disk_rect.y + 70 + i * 30), (mem_rect.left - 10, mem_rect.y + 70 + i * 30), 3)
                pygame.draw.polygon(screen, ACCENT_PINK, [(mem_rect.left - 10, mem_rect.y + 70 + i * 30), (mem_rect.left - 20, mem_rect.y + 65 + i * 30), (mem_rect.left - 20, mem_rect.y + 75 + i * 30)])
                # Text in mem
                screen.blit(font_code.render(lines[i], True, ACCENT_CYAN), (mem_rect.x + 15, mem_rect.y + 60 + i * 30))

        if action_state == 0:
            screen.blit(font_body.render("Click Execute to read lines from Disk to RAM.", True, TEXT_WHITE), (stage_rect.x + 30, stage_rect.bottom - 40))

    elif current_step == 1:
        # Stage 2: JSON
        dict_box = pygame.Rect(stage_rect.x + 30, stage_rect.y + 70, 200, 150)
        pygame.draw.rect(screen, (24, 27, 40), dict_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_CYAN, dict_box, width=2, border_radius=8)
        screen.blit(font_heading.render("Python Dictionary", True, ACCENT_CYAN), (dict_box.x + 10, dict_box.y + 10))
        screen.blit(font_code.render("{", True, TEXT_WHITE), (dict_box.x + 15, dict_box.y + 40))
        screen.blit(font_code.render(" 'name': 'Rex',", True, ACCENT_YELLOW), (dict_box.x + 15, dict_box.y + 60))
        screen.blit(font_code.render(" 'speed': 5", True, ACCENT_GREEN), (dict_box.x + 15, dict_box.y + 80))
        screen.blit(font_code.render("}", True, TEXT_WHITE), (dict_box.x + 15, dict_box.y + 100))

        json_box = pygame.Rect(stage_rect.x + 330, stage_rect.y + 70, 200, 150)
        pygame.draw.rect(screen, (30, 20, 20), json_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_PINK, json_box, width=2, border_radius=8)
        screen.blit(font_heading.render("JSON String (Disk)", True, ACCENT_PINK), (json_box.x + 10, json_box.y + 10))
        
        if action_state >= 1:
            pygame.draw.line(screen, ACCENT_GREEN, (dict_box.right + 10, dict_box.centery - 20), (json_box.left - 10, json_box.centery - 20), 3)
            screen.blit(font_body.render("json.dumps() >>", True, ACCENT_GREEN), (dict_box.right + 5, dict_box.centery - 40))
            
            # String representation
            screen.blit(font_code_small.render('{"name":"Rex",', True, TEXT_WHITE), (json_box.x + 10, json_box.y + 60))
            screen.blit(font_code_small.render('"speed":5}', True, TEXT_WHITE), (json_box.x + 10, json_box.y + 75))

        if action_state >= 2:
            pygame.draw.line(screen, ACCENT_YELLOW, (json_box.left - 10, json_box.centery + 20), (dict_box.right + 10, dict_box.centery + 20), 3)
            screen.blit(font_body.render("<< json.loads()", True, ACCENT_YELLOW), (dict_box.right + 5, dict_box.centery + 5))

    elif current_step == 2:
        # Stage 3: Binary
        hex_box = pygame.Rect(stage_rect.x + 30, stage_rect.y + 70, 200, 300)
        pygame.draw.rect(screen, (10, 10, 10), hex_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_ORANGE, hex_box, width=2, border_radius=8)
        screen.blit(font_heading.render("image.bin (Hex)", True, ACCENT_ORANGE), (hex_box.x + 10, hex_box.y + 10))
        
        hex_data = [
            "FF 00 00  00 FF 00",
            "00 00 FF  FF FF 00",
            "00 FF FF  FF 00 FF",
            "00 00 00  FF FF FF"
        ]
        for i, h in enumerate(hex_data):
            screen.blit(font_hex.render(h, True, TEXT_MUTED if action_state == 0 else TEXT_WHITE), (hex_box.x + 15, hex_box.y + 50 + i * 25))

        decoder_rect = pygame.Rect(stage_rect.x + 250, stage_rect.y + 180, 80, 40)
        pygame.draw.rect(screen, ACCENT_PURPLE, decoder_rect, border_radius=5)
        dt = font_badge.render("DECODER", True, (0,0,0))
        screen.blit(dt, dt.get_rect(center=decoder_rect.center))

        img_box = pygame.Rect(stage_rect.x + 350, stage_rect.y + 70, 180, 180)
        pygame.draw.rect(screen, (40, 40, 40), img_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_CYAN, img_box, width=2, border_radius=8)

        if action_state >= 1:
            pygame.draw.line(screen, ACCENT_ORANGE, (hex_box.right, hex_box.centery), (decoder_rect.left, decoder_rect.centery), 2)
            pygame.draw.line(screen, ACCENT_CYAN, (decoder_rect.right, decoder_rect.centery), (img_box.left, img_box.centery), 2)

            # Draw decoded pixels
            colors = [ (255,0,0), (0,255,0), (0,0,255), (255,255,0), (0,255,255), (255,0,255), (0,0,0), (255,255,255) ]
            sw, sh = 70, 70
            for r in range(4):
                for c in range(2):
                    idx = r*2 + c
                    if idx < len(colors):
                        px = pygame.Rect(img_box.x + 15 + c*75, img_box.y + 15 + (r//2)*75 + (r%2)*37, 70, 35) # crude grid
                        pygame.draw.rect(screen, colors[idx], px)

    elif current_step == 3:
        # Stage 4: Containers
        zip_box = pygame.Rect(stage_rect.x + 200, stage_rect.y + 200, 160, 120)
        if action_state == 0:
            # Packed
            pygame.draw.rect(screen, (150, 120, 50), zip_box, border_radius=10)
            pygame.draw.rect(screen, ACCENT_YELLOW, zip_box, width=3, border_radius=10)
            zt = font_heading.render("project.zip", True, (0,0,0))
            screen.blit(zt, zt.get_rect(center=zip_box.center))
            sub = font_body.render("(Or .docx, .dwg)", True, (50,50,50))
            screen.blit(sub, (zip_box.x + 25, zip_box.y + 80))
        else:
            # Unpacked (Folder view)
            pygame.draw.rect(screen, (30, 40, 50), zip_box, border_radius=10)
            pygame.draw.rect(screen, ACCENT_CYAN, zip_box, width=2, border_radius=10)
            screen.blit(font_heading.render("Folder View", True, ACCENT_CYAN), (zip_box.x + 10, zip_box.y + 10))

            files = ["layout.xml", "texture.png", "data.json"]
            colors = [ACCENT_PINK, ACCENT_GREEN, ACCENT_YELLOW]
            
            # Draw extracted files exploding out
            for i, f in enumerate(files):
                fx = stage_rect.x + 40 + i * 160
                fy = stage_rect.y + 80
                f_box = pygame.Rect(fx, fy, 140, 60)
                pygame.draw.rect(screen, (20, 20, 20), f_box, border_radius=5)
                pygame.draw.rect(screen, colors[i], f_box, width=2, border_radius=5)
                screen.blit(font_code.render(f, True, colors[i]), (f_box.x + 10, f_box.y + 20))
                
                # Line to original folder
                pygame.draw.line(screen, TEXT_MUTED, (f_box.centerx, f_box.bottom), (zip_box.centerx, zip_box.top), 1)

    elif current_step == 4:
        # Stage 5: PLC
        pc_box = pygame.Rect(stage_rect.x + 30, stage_rect.y + 150, 180, 160)
        pygame.draw.rect(screen, (30, 30, 40), pc_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_PURPLE, pc_box, width=2, border_radius=8)
        screen.blit(font_heading.render("Compiler PC", True, ACCENT_PURPLE), (pc_box.x + 15, pc_box.y + 15))
        screen.blit(font_body.render("1. Code", True, TEXT_MUTED), (pc_box.x + 15, pc_box.y + 50))
        screen.blit(font_body.render("2. Tags", True, TEXT_MUTED), (pc_box.x + 15, pc_box.y + 70))
        screen.blit(font_body.render("3. IO Config", True, TEXT_MUTED), (pc_box.x + 15, pc_box.y + 90))

        plc_box = pygame.Rect(stage_rect.x + 350, stage_rect.y + 120, 180, 250)
        pygame.draw.rect(screen, (20, 40, 20), plc_box, border_radius=8)
        pygame.draw.rect(screen, ACCENT_GREEN, plc_box, width=2, border_radius=8)
        screen.blit(font_heading.render("Hardware PLC", True, ACCENT_GREEN), (plc_box.x + 15, plc_box.y + 15))

        if action_state == 0:
            # Network idle
            pygame.draw.line(screen, PANEL_BORDER, (pc_box.right, pc_box.centery), (plc_box.left, plc_box.centery), 4)
        else:
            # Packed and transmitted
            pygame.draw.line(screen, ACCENT_GREEN, (pc_box.right, pc_box.centery), (plc_box.left, plc_box.centery), 4)
            pkg = pygame.Rect(pc_box.right + 20, pc_box.centery - 15, 80, 30)
            pygame.draw.rect(screen, ACCENT_YELLOW, pkg, border_radius=4)
            pt = font_badge.render("PACKAGE.AP16", True, (0,0,0))
            screen.blit(pt, pt.get_rect(center=pkg.center))

            # Unpacked inside PLC
            pygame.draw.rect(screen, (10, 20, 10), (plc_box.x + 10, plc_box.y + 50, 160, 50), border_radius=4)
            screen.blit(font_body.render("Memory: Tags (Data)", True, ACCENT_YELLOW), (plc_box.x + 15, plc_box.y + 65))

            pygame.draw.rect(screen, (10, 20, 10), (plc_box.x + 10, plc_box.y + 110, 160, 50), border_radius=4)
            screen.blit(font_body.render("Logic: Main_OB1", True, ACCENT_CYAN), (plc_box.x + 15, plc_box.y + 125))

            pygame.draw.rect(screen, (10, 20, 10), (plc_box.x + 10, plc_box.y + 170, 160, 50), border_radius=4)
            screen.blit(font_body.render("Drivers: IO Config", True, ACCENT_PINK), (plc_box.x + 15, plc_box.y + 185))


def main():
    global current_step, action_state
    running = True

    while running:
        mouse_pos = pygame.mouse.get_pos()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RIGHT or event.key == pygame.K_SPACE:
                    current_step = min(len(STEPS) - 1, current_step + 1)
                    action_state = 0
                elif event.key == pygame.K_LEFT:
                    current_step = max(0, current_step - 1)
                    action_state = 0

            # Navigation buttons
            if btn_next.is_clicked(event):
                current_step = min(len(STEPS) - 1, current_step + 1)
                action_state = 0
            elif btn_prev.is_clicked(event):
                current_step = max(0, current_step - 1)
                action_state = 0

            # Action button
            if btn_action.is_clicked(event):
                if current_step == 0:
                    action_state = min(3, action_state + 1) # Read lines
                elif current_step == 1:
                    action_state = min(2, action_state + 1) # Pack -> Unpack
                elif current_step == 2:
                    action_state = min(1, action_state + 1) # Decode hex
                elif current_step == 3:
                    action_state = min(1, action_state + 1) # Unzip
                elif current_step == 4:
                    action_state = min(1, action_state + 1) # Deploy PLC

        # Render Frame
        screen.fill(BG_COLOR)
        draw_header()
        draw_code_panel()
        draw_visual_stage()

        # Draw Nav Buttons
        btn_prev.draw(screen, mouse_pos)
        btn_next.draw(screen, mouse_pos)
        
        btn_action.text = "Step Action >>" if action_state == 0 else "Next Step >>"
        btn_action.draw(screen, mouse_pos)

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()
