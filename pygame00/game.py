import sys
import logging
import io
import pygame
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

def load_svg_sprite(filepath, target_size=(64, 64)):
    logging.info("Starting conversion and loading of SVG sprite: %s", filepath)
    try:
        drawing = svg2rlg(filepath)
        if drawing is None:
            raise ValueError(f"Could not parse SVG content from file '{filepath}'.")

        orig_width = drawing.width
        orig_height = drawing.height

        if orig_width > 0 and orig_height > 0:
            scale_x = target_size[0] / orig_width
            scale_y = target_size[1] / orig_height
            drawing.scale(scale_x, scale_y)
            drawing.width = target_size[0]
            drawing.height = target_size[1]
        else:
            logging.warning("Drawing dimensions invalid (width=%s, height=%s). Skipping scaling.", orig_width, orig_height)

        byte_stream = io.BytesIO()
        renderPM.drawToFile(drawing, byte_stream, fmt="PNG")
        byte_stream.seek(0)

        surface = pygame.image.load(byte_stream).convert_alpha()
        logging.info("Successfully loaded sprite: %s", filepath)
        return surface
    except Exception as exc:
        logging.error("Failed to load SVG sprite '%s': %s", filepath, exc)
        logging.info("Falling back to a procedural placeholder surface.")
        fallback = pygame.Surface(target_size, pygame.SRCALPHA)
        fallback.fill((220, 100, 50))
        return fallback

def main():
    logging.info("Initializing Pygame engine...")
    try:
        pygame.init()
    except Exception as exc:
        logging.critical("Could not initialize Pygame: %s", exc)
        sys.exit(1)

    screen_width, screen_height = 800, 600
    try:
        screen = pygame.display.set_mode((screen_width, screen_height))
        pygame.display.set_caption("Cat Movement Simulation")
    except Exception as exc:
        logging.critical("Failed to create display window: %s", exc)
        pygame.quit()
        sys.exit(1)

    clock = pygame.time.Clock()
    font = pygame.font.SysFont(None, 24)

    sprite = load_svg_sprite("cat_a.svg", target_size=(64, 64))

    current_pos = pygame.Vector2(screen_width // 2, screen_height // 2)
    target_pos = pygame.Vector2(current_pos)
    speed = 250.0

    input_text = ""
    status_msg = "Enter target 'X Y' (e.g. 200 400) and press ENTER:"
    is_moving = False

    logging.info("Entering main application loop.")
    running = True
    while running:
        dt = clock.tick(60) / 1000.0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                logging.info("Quit signal received.")
                running = False

            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    logging.info("Escape pressed. Exiting.")
                    running = False

                elif event.key == pygame.K_RETURN:
                    logging.info("Parsing input: '%s'", input_text)
                    try:
                        parts = input_text.strip().split()
                        if len(parts) != 2:
                            raise ValueError("Requires exactly two coordinates (X and Y).")

                        tx, ty = float(parts[0]), float(parts[1])

                        if 0 <= tx <= screen_width and 0 <= ty <= screen_height:
                            target_pos = pygame.Vector2(tx, ty)
                            distance = current_pos.distance_to(target_pos)
                            if distance > 1.0:
                                is_moving = True
                                logging.info("New target accepted: (%s, %s). Distance: %.2f px.", tx, ty, distance)
                                status_msg = f"Moving to ({int(tx)}, {int(ty)})..."
                            else:
                                is_moving = False
                                logging.info("Already at destination coordinates.")
                                status_msg = "Already at coordinates. Enter target 'X Y':"
                        else:
                            raise ValueError(f"Coordinates must be within 0-{screen_width} and 0-{screen_height}.")

                    except ValueError as err:
                        logging.warning("Input error: %s", err)
                        status_msg = f"Invalid input! Use: X Y within bounds (0-{screen_width}, 0-{screen_height})"

                    input_text = ""

                elif event.key == pygame.K_BACKSPACE:
                    input_text = input_text[:-1]

                else:
                    if event.unicode.isprintable():
                        input_text += event.unicode

        if is_moving:
            to_target = target_pos - current_pos
            distance = to_target.length()
            step = speed * dt

            if distance <= step:
                current_pos = pygame.Vector2(target_pos)
                is_moving = False
                logging.info("Destination reached: (%s, %s). Waiting for next input.", target_pos.x, target_pos.y)
                status_msg = "Target reached. Enter next 'X Y':"
            else:
                current_pos += to_target.normalize() * step

        screen.fill((30, 30, 35))

        sprite_rect = sprite.get_rect(center=(int(current_pos.x), int(current_pos.y)))
        screen.blit(sprite, sprite_rect)

        status_surface = font.render(status_msg, True, (200, 200, 200))
        input_surface = font.render(f"> {input_text}", True, (255, 255, 0))
        pos_surface = font.render(f"Pos: ({int(current_pos.x)}, {int(current_pos.y)})", True, (150, 150, 150))

        screen.blit(status_surface, (20, 20))
        screen.blit(input_surface, (20, 50))
        screen.blit(pos_surface, (20, 80))

        pygame.display.flip()

    pygame.quit()
    logging.info("Pygame context terminated.")

if __name__ == "__main__":
    try:
        main()
    except Exception as fatal_exc:
        logging.critical("Unhandled application crash: %s", fatal_exc)
        sys.exit(1)