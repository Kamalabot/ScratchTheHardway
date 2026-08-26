import os
import sys
import json
import requests

JSON_FILE_PATH = "assets_json\\sprites.json"
SCRATCH_CDN_URL = "https://assets.scratch.mit.edu/internalapi/asset/{md5ext}/get/"

def download_file_with_progress(url, destination):
    try:
        response = requests.get(url, stream=True, timeout=20)
        response.raise_for_status()
        total_size = int(response.headers.get("content-length", 0))
        downloaded = 0
        chunk_size = 4096

        with open(destination, "wb") as f:
            for chunk in response.iter_content(chunk_size=chunk_size):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        pct = (downloaded / total_size) * 100
                        print(f"\rDownloading {os.path.basename(destination)}: {pct:.1f}% ({downloaded}/{total_size} bytes)", end="")
                    else:
                        print(f"\rDownloading {os.path.basename(destination)}: {downloaded} bytes", end="")
        print(" [Done]")
    except requests.exceptions.RequestException as err:
        print(f"\n[Error] Download failed: {err}")

def select_sprite(sprites):
    print(f"\n{'='*50}\nAvailable Sprites ({len(sprites)} found)\n{'='*50}")
    for idx, sprite in enumerate(sprites, start=1):
        print(f"[{idx:3d}] {sprite.get('name', 'Unnamed')}")
    
    while True:
        choice = input("\nEnter Sprite Number or Name (or 'q' to exit): ").strip()
        if choice.lower() == 'q':
            sys.exit(0)
        
        if choice.isdigit():
            index = int(choice) - 1
            if 0 <= index < len(sprites):
                return sprites[index]
        
        # Name matching fallback
        matched = [s for s in sprites if s.get('name', '').lower() == choice.lower()]
        if matched:
            return matched[0]

        print("[Warning] Invalid selection. Please choose a valid index or name.")

def select_and_download_costume(sprite):
    sprite_name = sprite.get('name', 'Sprite')
    costumes = sprite.get('costumes', [])

    if not costumes:
        print(f"[Error] Sprite '{sprite_name}' contains no costumes.")
        return

    output_dir = os.path.join(".", sprite_name.replace(" ", "_"))
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'-'*50}\nCostumes for '{sprite_name}'\n{'-'*50}")
    print("[  0] Download ALL costumes")
    for idx, costume in enumerate(costumes, start=1):
        c_name = costume.get('name', 'Unnamed')
        fmt = costume.get('dataFormat', 'svg')
        print(f"[{idx:3d}] {c_name} (.{fmt})")

    while True:
        choice = input(f"\nSelect costume number for '{sprite_name}' (0-{len(costumes)}): ").strip()
        
        if choice == '0':
            print(f"[Info] Downloading all {len(costumes)} costumes...")
            for costume in costumes:
                name = costume.get('name', 'costume')
                md5ext = costume.get('md5ext')
                if not md5ext:
                    continue
                ext = md5ext.split(".")[-1]
                target_path = os.path.join(output_dir, f"{name}.{ext}")
                url = SCRATCH_CDN_URL.format(md5ext=md5ext)
                download_file_with_progress(url, target_path)
            print(f"[Success] All costumes saved into '{output_dir}/'")
            break

        elif choice.isdigit():
            index = int(choice) - 1
            if 0 <= index < len(costumes):
                selected_costume = costumes[index]
                name = selected_costume.get('name', 'costume')
                md5ext = selected_costume.get('md5ext')
                
                if not md5ext:
                    print("[Error] Missing 'md5ext' attribute.")
                    return
                
                ext = md5ext.split(".")[-1]
                target_path = os.path.join(output_dir, f"{name}.{ext}")
                url = SCRATCH_CDN_URL.format(md5ext=md5ext)
                
                print(f"[Info] Fetching {name}.{ext}...")
                download_file_with_progress(url, target_path)
                print(f"[Success] Saved: {target_path}")
                break
        
        print("[Warning] Invalid costume index. Please try again.")

def main():
    if not os.path.exists(JSON_FILE_PATH):
        print(f"[Fatal] '{JSON_FILE_PATH}' does not exist in the working directory.")
        sys.exit(1)

    print(f"[Info] Loading JSON data from {JSON_FILE_PATH}...")
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as f:
            sprites_data = json.load(f)
    except json.JSONDecodeError as err:
        print(f"[Fatal] JSON parse failed: {err}")
        sys.exit(1)

    if not isinstance(sprites_data, list) or len(sprites_data) == 0:
        print("[Fatal] JSON root must be a non-empty array of sprite definitions.")
        sys.exit(1)

    while True:
        chosen_sprite = select_sprite(sprites_data)
        select_and_download_costume(chosen_sprite)
        
        cont = input("\nDo you want to extract from another sprite? (y/n): ").strip().lower()
        if cont != 'y':
            print("[Info] Extraction session terminated.")
            break

if __name__ == "__main__":
    main()