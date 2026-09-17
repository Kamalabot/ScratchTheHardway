# 🎨 Open-Source 2D & 3D Procedural Asset & Pipeline Guide

This comprehensive guide details open-source asset repositories, procedural generators, texturing tools, retopology software, motion capture frameworks, and production pipeline orchestrators for **Characters (Humans, Robots, Aliens, Fantasy)**, **Vehicles**, **Buildings**, and **Environments / Spaces**.

---

## 📦 1. Humanoid & Character Avatar Builders (2D & 3D)

### 1. Universal LPC Raw Modular Spritesheet Parts (2D Pixel Art)
- **GitHub Directory**: [https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Generator/tree/master/spritesheets](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Generator/tree/master/spritesheets)
- **License**: CC-BY-SA / GPL
- **Raw PNG Parts Included**:
  - `body/` — Male, female, child bodies in 8 skin tones (plus alien/orc green, pale gray, shadow tones).
  - `eyes/` — 12+ eye styles and colors (blue, green, brown, red, glowing).
  - `hair/` — 60+ hairstyles (short, long, ponytail, afro, mohawk, braids).
  - `head/` — Beards, moustaches, glasses, masks, hats, helmets.
  - `torso/` — Business suits, jackets, dress shirts, vests, hoodies, armor.
  - `legs/` — Dress pants, jeans, skirts, shorts.
  - `feet/` — Leather shoes, boots, sneakers, sandals.

### 2. Open Peeps (Hand-Drawn Vector & Raster Library)
- **Website**: [https://www.openpeeps.com/](https://www.openpeeps.com/)
- **License**: **CC0 (100% Free Public Domain)**
- **Features**: 584,000+ combinations of expressions, hair, torsos, and standing/sitting poses.

### 3. Avataaars (Clean Modern Vector Avatar Parts)
- **Website**: [https://avataaars.com/](https://avataaars.com/)
- **License**: MIT
- **Features**: Modular hairstyles, accessories, facial hair, facial expressions, and clothing.

### 4. DiceBear Open-Source Avatar Engine (Humans & Non-Humans)
- **Website**: [https://www.dicebear.com/](https://www.dicebear.com/)
- **License**: MIT / CC0
- **Features**: Generates SVG avatars on-the-fly via REST API or code spanning humans, robots, and creatures.

### 5. Kenney.nl Modular Character Parts
- **Website**: [https://kenney.nl/assets/toon-characters-1](https://kenney.nl/assets/toon-characters-1)
- **License**: **CC0 (Public Domain)**

---

## 🤖 2. Creative & Non-Human Character Builders (Robots, Aliens, Monsters & Fantasy)

### 1. DiceBear "Bottts" & "Bottts Neutral" (2D SVG Robot Engine)
- **API URL**: `https://api.dicebear.com/7.x/bottts/svg`
- **License**: CC0 / MIT
- **Features**: Modular robot antennae, sensors, visor eyes, digital displays, and metal chest plates.

### 2. RoboHash Procedural Character Engine (Robots, Aliens, Monsters)
- **Website / Repository**: [https://robohash.org/](https://robohash.org/) | [https://github.com/eefy/robohash](https://github.com/eefy/robohash)
- **License**: Open Source (MIT)
- **Features**: Generates procedural Robots (Set 1), Monsters/Aliens (Set 2), and Robot Heads (Set 3) from text strings.

### 3. Kenney.nl Modular Sci-Fi & Robot Assets (2D & 3D)
- **Website**: [https://kenney.nl/assets?q=robot](https://kenney.nl/assets?q=robot)
- **License**: **CC0 (Public Domain)**

### 4. VRoid Studio (Free 3D Anime, Fantasy & Fairy Tale Avatar Creator)
- **Website**: [https://vroid.com/en/studio](https://vroid.com/en/studio)
- **License**: Free for commercial & non-commercial use
- **Features**: 3D generator for elf ears, animal ears, horns, wings, tails, and magical garments exporting to `.VRM` / `.FBX` / `.OBJ`.

### 5. MB-Lab / MakeHuman Fantasy Morph Presets (Open-Source 3D)
- **Website**: [https://github.com/animate13/MB-Lab](https://github.com/animate13/MB-Lab) | [http://www.makehumancommunity.org/](http://www.makehumancommunity.org/)
- **License**: AGPL / CC0 outputs

---

## ⚡ 3. High-Fidelity & MetaHuman-Class 3D Character Creation Systems

### 1. Epic Games MetaHuman Creator (+ Non-Human Customization)
- **Website**: [https://www.unrealengine.com/en-US/metahuman](https://www.unrealengine.com/en-US/metahuman)
- **License**: Free for use in Unreal Engine
- **Overview**: Cloud-based photorealistic digital human creator. Extended for sci-fi/aliens via shader overrides, cyberware socket attachments, and custom DNA morph calibration.

### 2. Ready Player Me (Cross-Platform 3D Avatar System)
- **Website**: [https://readyplayer.me/](https://readyplayer.me/)
- **License**: Free developer tier with SDKs for WebGL, Unity, Unreal.
- **Overview**: Cross-platform 3D avatars with cyberpunk, sci-fi, alien, and fantasy cosmetics exporting to `.GLB`.

### 3. Reallusion Character Creator 4 (CC4)
- **Website**: [https://www.reallusion.com/character-creator/](https://www.reallusion.com/character-creator/)
- **License**: Commercial Software

### 4. Open-Source Generative AI 3D Pipelines (TRELLIS, Hunyuan3D, TripoSR)
- **Overview**: Self-hosted image-to-3D pipelines for generating custom non-human parts and meshes on demand.

---

## 🚗 4. Procedural Vehicle & Spacecraft Generators

### 1. SpaceshipGenerator (3D Procedural Starships & Sci-Fi Vehicles)
- **Repository**: [https://github.com/ldo/blender_spaceship_generator](https://github.com/ldo/blender_spaceship_generator)
- **License**: Open Source (GPL-3.0)
- **Active Development Status**: Actively Maintained (Fork by `ldo`, updated for Blender 4.x).
- **Features**: Generates 3D starships, hover tanks, and mech craft with procedural hull extrusions and turrets.

### 2. Rigacar (Procedural Vehicle Rigging & Suspension Engine)
- **Repository**: [https://github.com/digicreatures/rigacar](https://github.com/digicreatures/rigacar)
- **License**: Open Source (GPL-3.0)
- **Active Development Status**: Actively Maintained (`digicreatures/rigacar`).
- **Features**: Generates vehicle physics rigs, wheel constraints, and suspension controls.

### 3. Kenney.nl Modular Vehicle & Spacecraft Kits (2D & 3D)
- **Website**: [https://kenney.nl/assets?q=vehicle](https://kenney.nl/assets?q=vehicle)
- **License**: **CC0 (Public Domain)**

### 4. Custom Python Procedural Vehicle Generator for Blender
```python
import bpy

def build_vehicle_chassis():
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 1.0))
    body = bpy.context.active_object
    body.name = "Vehicle_Body"
    body.scale = (4.5, 2.0, 1.2)
    bpy.ops.object.transform_apply(scale=True)

    wheel_positions = [(1.5, 1.2, 0.5), (-1.5, 1.2, 0.5), (1.5, -1.2, 0.5), (-1.5, -1.2, 0.5)]
    for idx, pos in enumerate(wheel_positions):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.6, depth=0.4, location=pos)
        wheel = bpy.context.active_object
        wheel.name = f"Wheel_{idx+1}"
        wheel.rotation_euler = (1.5708, 0, 0)

build_vehicle_chassis()
```

---

## 🏢 5. Procedural Building & Architecture Generators

### 1. BuildingTools (Procedural 3D Architecture Generator)
- **Repository**: [https://github.com/ranousit/buildingtools](https://github.com/ranousit/buildingtools)
- **License**: Open Source (GPL-3.0)
- **Active Development Status**: Actively Maintained (`ranousit/buildingtools`).
- **Features**: Procedurally generates multi-floor buildings, roofs, doors, windows, balconies, and stairs in Blender.

### 2. Procedural-Building-Generator (Tree-map & Grid Architecture)
- **Repository**: [https://github.com/wojtryb/Procedural-Building-Generator](https://github.com/wojtryb/Procedural-Building-Generator)
- **License**: Open Source (MIT License)
- **Active Development Status**: Actively Maintained (`wojtryb/Procedural-Building-Generator`).

### 3. Custom Python Multi-Story Building Generator for Blender
```python
import bpy

def generate_building(floors=5, width=10, depth=8, floor_height=3.0):
    for f in range(floors):
        z_offset = f * floor_height
        bpy.ops.mesh.primitive_cube_add(
            size=1.0,
            location=(0, 0, z_offset + (floor_height / 2.0))
        )
        cube = bpy.context.active_object
        cube.name = f"Building_Floor_{f+1}"
        cube.scale = (width, depth, floor_height)
        bpy.ops.object.transform_apply(scale=True)

generate_building(floors=6, width=12, depth=10, floor_height=3.2)
```

---

## 🌌 6. Procedural Space, Environment & Interior Generators

### 1. BlenderProc (DLR Procedural Scene & Environment Generator)
- **Repository**: [https://github.com/DLR-RM/BlenderProc](https://github.com/DLR-RM/BlenderProc)
- **License**: Open Source (MIT License)
- **Active Development Status**: Actively Maintained (`DLR-RM/BlenderProc`).
- **Features**: Procedural generation of indoor rooms, furniture layouts, lighting, and outdoor scenes.

### 2. FastWFC / WaveFunctionCollapse (Procedural Space & Level Layout Engine)
- **Repository**: [https://github.com/marian42/wavefunctioncollapse](https://github.com/marian42/wavefunctioncollapse)
- **License**: Open Source (MIT License)
- **Active Development Status**: Actively Maintained.
- **Features**: Generates non-overlapping procedural rooms, corridors, dungeons, and building layouts.

---

## 🎨 7. Open Source Texturing, Retopology & Motion Capture Tools

### 1. Material Maker (Procedural PBR Material Engine)
- **Repository**: [https://github.com/RodZill4/material-maker](https://github.com/RodZill4/material-maker)
- **License**: Open Source (MIT License)
- **Active Development Status**: Actively Maintained (`RodZill4/material-maker`, Version 1.7 in 2026).
- **Features**: Node-based PBR material authoring tool (Substance Designer alternative).

### 2. ArmorPaint (Hardware-Accelerated 3D Texture Painting)
- **Repository**: [https://github.com/armory3d/armorpaint](https://github.com/armory3d/armorpaint)
- **License**: Open Source (zlib/libpng License)
- **Active Development Status**: Actively Maintained (`armory3d/armorpaint`, Version 1.0 C core rewrite).
- **Features**: Standalone 3D texture painter (Substance Painter alternative).

### 3. Instant Meshes (Automated Quad Remeshing)
- **Repository**: [https://github.com/wjakob/instant-meshes](https://github.com/wjakob/instant-meshes)
- **License**: Open Source (BSD 3-Clause)
- **Active Development Status**: Stable reference implementation.

### 4. OpenCap (Markerless AI Motion Capture Engine)
- **Repository**: [https://github.com/stanfordnmbl/opencap-processing](https://github.com/stanfordnmbl/opencap-processing)
- **License**: Open Source (Apache 2.0 / Academic License)
- **Active Development Status**: Actively Maintained (`stanfordnmbl/opencap-processing`).

---

## 🗄️ 8. Open Source Asset Pipeline Orchestration & Production Tracking

### 1. AYON by Ynput (Open Pipeline Engine)
- **Repository**: [https://github.com/ynput/ayon-core](https://github.com/ynput/ayon-core)
- **License**: Open Source (Apache 2.0)
- **Active Development Status**: Actively Maintained (`ynput/ayon-core`).
- **Features**: Orchestrates 3D asset workflows, folder structures, and application integrations (Shotgrid alternative).

### 2. Kitsu by CGWire (Production Tracking API)
- **Repository**: [https://github.com/cgwire/kitsu](https://github.com/cgwire/kitsu)
- **License**: Open Source (AGPL-3.0)
- **Active Development Status**: Actively Maintained (`cgwire/kitsu`).

### 3. Python PBR Texture Baking Automation Script for Blender
```python
import bpy

def setup_pbr_baker(target_object_name):
    obj = bpy.data.objects.get(target_object_name)
    if not obj:
        return

    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)

    mat = obj.active_material
    if not mat:
        mat = bpy.data.materials.new(name="AutoBake_Material")
        obj.data.materials.append(mat)
        mat.use_nodes = True

    nodes = mat.node_tree.nodes
    texture_node = nodes.new(type='ShaderNodeTexImage')
    
    img = bpy.data.images.new("Baked_Texture_Map", width=2048, height=2048)
    texture_node.image = img
    nodes.active = texture_node

    bpy.context.scene.render.engine = 'CYCLES'
    bpy.ops.object.bake(type='COMBINED')

setup_pbr_baker("Cube")
```

---

## 💎 9. Hidden Sovereign QOL Tools for 2D/3D Pipelines

Tool Name: **TrenchBroom**
Usage Intro: 3D level editor for rapidly constructing room layouts, indoor spaces, buildings, and retro/modern game geometry using brush controls.
The Layman Problem Solved: Eliminates the steep learning curve of 3D modeling software when sketching out 3D rooms, hallways, and buildings.
Open Source Status: Open Source (GPL-3.0)
Active Development Status: Actively Maintained (Regular updates on GitHub `TrenchBroom/TrenchBroom`).

Tool Name: **Meshroom**
Usage Intro: Open-source 3D photogrammetry application for reconstructing 3D environments, props, and scanned objects from photo arrays.
The Layman Problem Solved: Automatically converts camera photos of real buildings, rooms, or vehicles into textured 3D digital models.
Open Source Status: Open Source (MPL v2.0)
Active Development Status: Actively Maintained (Maintained by AliceVision on GitHub `alicevision/meshroom`).

Tool Name: **gltf-pipeline**
Usage Intro: Command-line optimization tool for converting, Draco-compressing, and packaging 3D vehicle, building, and space meshes.
The Layman Problem Solved: Automatically compresses heavy 3D models so they load instantly in web browsers or game engines.
Open Source Status: Open Source (Apache 2.0)
Active Development Status: Actively Maintained (`CESIUMGS/gltf-pipeline`).

Tool Name: **FastWFC**
Usage Intro: High-performance C++ and Python library for generating non-overlapping procedural rooms, dungeons, and building floorplans.
The Layman Problem Solved: Automatically generates valid space layouts and room connections from tile rules.
Open Source Status: Open Source (MIT License)
Active Development Status: Actively Maintained (`marian42/wavefunctioncollapse`).

Tool Name: **Material Maker CLI**
Usage Intro: Command-line interface for compiling `.pbr` node graphs into output textures without opening a GUI.
The Layman Problem Solved: Automates procedural texture rendering in headless build scripts.
Open Source Status: Open Source (MIT License)
Active Development Status: Actively Maintained (`RodZill4/material-maker`).

Tool Name: **AYON Desktop Launcher**
Usage Intro: System tray UI wrapper that connects local DCC applications (Blender, Unreal Engine, Houdini) to a central asset pipeline.
The Layman Problem Solved: Sets up consistent project directory structures and asset paths across all 3D software.
Open Source Status: Open Source (Apache 2.0)
Active Development Status: Actively Maintained (`ynput/ayon-launcher`).

Tool Name: **OpenUSD (usdview & usdtree)**
Usage Intro: Pixar's open-source 3D scene description standard and CLI inspection tools for assembling complex, multi-layered 3D scenes.
The Layman Problem Solved: Swaps props, materials, and lighting setups across different 3D software without exporting fragile file formats.
Open Source Status: Open Source (Apache 2.0)
Active Development Status: Actively Maintained (Maintained by Pixar & ASWF on GitHub `PixarAnimationStudios/OpenUSD`).
