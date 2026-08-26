import os
import sys
import json
import requests

DEFAULT_JSON = "backdrops.json"
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

def process_single_backdrop(item, output_dir="backdrops"):
    os.makedirs(output_dir, exist_ok=True)
    name = item.get("name", "backdrop").replace(" ", "_")
    md5ext = item.get("md5ext")
    if not md5ext:
        print(f"[Error] Missing 'md5ext' for '{name}'.")
        return

    ext = md5ext.split(".")[-1]
    target_path = os.path.join(output_dir, f"{name}.{ext}")
    url = SCRATCH_CDN_URL.format(md5ext=md5ext)

    print(f"[Info] Fetching {name}.{ext}...")
    download_file_with_progress(url, target_path)
    print(f"[Success] Saved: {target_path}")

def process_sprite_costumes(sprite):
    sprite_name = sprite.get("name", "Sprite")
    costumes = sprite.get("costumes", [])

    if not costumes:
        print(f"[Error] Item '{sprite_name}' contains no costumes.")
        return

    output_dir = os.path.join(".", sprite_name.replace(" ", "_"))
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'-'*50}\nCostumes for '{sprite_name}'\n{'-'*50}")
    print("[  0] Download ALL costumes")
    for idx, costume in enumerate(costumes, start=1):
        c_name = costume.get("name", "Unnamed")
        fmt = costume.get("dataFormat", "svg")
        print(f"[{idx:3d}] {c_name} (.{fmt})")

    while True:
        choice = input(f"\nSelect costume number (0-{len(costumes)}): ").strip()
        if choice == "0":
            print(f"[Info] Downloading all {len(costumes)} costumes...")
            for costume in costumes:
                name = costume.get("name", "costume")
                md5ext = costume.get("md5ext")
                if not md5ext:
                    continue
                ext = md5ext.split(".")[-1]
                target_path = os.path.join(output_dir, f"{name}.{ext}")
                url = SCRATCH_CDN_URL.format(md5ext=md5ext)
                download_file_with_progress(url, target_path)
            print(f"[Success] All costumes saved into '{output_dir}/'")
            break

        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(costumes):
                c = costumes[idx]
                name = c.get("name", "costume")
                md5ext = c.get("md5ext")
                if md5ext:
                    ext = md5ext.split(".")[-1]
                    target_path = os.path.join(output_dir, f"{name}.{ext}")
                    url = SCRATCH_CDN_URL.format(md5ext=md5ext)
                    download_file_with_progress(url, target_path)
                    print(f"[Success] Saved: {target_path}")
                break

        print("[Warning] Invalid selection. Try again.")

def main():
    json_path = input(f"Enter JSON file path [default: {DEFAULT_JSON}]: ").strip()
    if not json_path:
        json_path = DEFAULT_JSON

    if not os.path.exists(json_path):
        print(f"[Fatal] File '{json_path}' not found.")
        sys.exit(1)

    print(f"[Info] Loading JSON data from {json_path}...")
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            items = json.load(f)
    except json.JSONDecodeError as err:
        print(f"[Fatal] JSON parse error: {err}")
        sys.exit(1)

    if not isinstance(items, list) or len(items) == 0:
        print("[Fatal] Root must be a non-empty array.")
        sys.exit(1)

    # Determine mode: Backdrop/Costume flat manifest vs Nested Sprite manifest
    is_flat_manifest = "md5ext" in items[0] and "costumes" not in items[0]
    category_name = "Backdrops/Costumes" if is_flat_manifest else "Sprites"

    while True:
        print(f"\n{'='*50}\nAvailable {category_name} ({len(items)} found)\n{'='*50}")
        if is_flat_manifest:
            print("[  0] Download ALL items")

        for idx, item in enumerate(items, start=1):
            name = item.get("name", "Unnamed")
            fmt = item.get("dataFormat", "")
            fmt_str = f" (.{fmt})" if fmt else ""
            print(f"[{idx:3d}] {name}{fmt_str}")

        choice = input(f"\nEnter Item Number or Name (or 'q' to exit): ").strip()
        if choice.lower() == "q":
            break

        if is_flat_manifest and choice == "0":
            print(f"[Info] Downloading all {len(items)} items...")
            for item in items:
                process_single_backdrop(item)
            print("[Success] All items downloaded.")
            continue

        selected_item = None
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(items):
                selected_item = items[idx]
        else:
            matched = [i for i in items if i.get("name", "").lower() == choice.lower()]
            if matched:
                selected_item = matched[0]

        if not selected_item:
            print("[Warning] Item not found. Please try again.")
            continue

        if is_flat_manifest:
            process_single_backdrop(selected_item)
        else:
            process_sprite_costumes(selected_item)

        cont = input("\nDo you want to extract another item? (y/n): ").strip().lower()
        if cont != "y":
            print("[Info] Session closed.")
            break

if __name__ == "__main__":
    main()