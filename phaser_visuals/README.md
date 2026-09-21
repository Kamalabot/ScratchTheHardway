# Walkthrough: Unified Visual Architecture Studio

## Overview
Both major visual curriculums—**File Packaging & Formats** and **Database & API Transit**—are now unified into a single interactive studio with an instant **Module Switcher** in the top navigation bar.

---

## How to Access the Visual Modules

### 1. In the Web Application (`http://localhost:5173/`)
Use the top header segmented buttons to toggle instantly between the two full visual systems:

```
[ 📦 1. FILE PACKAGING ]   |   [ 🗄️ 2. DATABASE & TRANSIT ]
```

#### Module 1: File Packaging & Formats
* **01 JSON**: In-memory heap nodes drawn into the Serializer Bus and formatted with elastic braces.
* **02 BINARY / PNG**: Memory hex grid scanned by laser sweep, flipping hex bytes into 24-bit RGB phosphor pixels.
* **03 VECTOR / PDF**: Cartesian coordinate plane with animated plotter crosshair computing cubic Bézier curves (de Casteljau's algorithm).
* **04 ZIP ARCHIVE**: Multi-file tree compressed in hydraulic clamps into a crystallized `.zip` module, with click-to-explode physics decompression.
* **05 PLC / CAD**: Ladder logic sensor registers (%IX0.0, %IW2) serialized into an OPC-UA telemetry frame with CRC16 validation.

#### Module 2: Database & API Transit
* **01 INGESTION**: Client registration form packed into HTTP/2 TLS packet, travelling across network hops into the API Gateway.
* **02 DB TABLES**: Relational table `users` with Write-Ahead Log (WAL) commit and B-Tree indexed row insertion.
* **03 CACHE RAM**: In-memory Redis key-value slots showing 0.1ms RAM vs 15ms NVMe Disk latency, with interactive lookup triggers.
* **04 API TRANSIT**: Client `GET /users/usr_94a2` query resolving from cache in 0.2ms and returning back across the wire.
* **05 ASYNC SAAS**: Background event queue decoupling transactional mailers (envelope flyout) and Stripe billing webhooks.

---

### 2. Standalone Pygame Script
The original Python/Pygame implementation also remains available in your repository:
```cmd
cd d:\gitFolders\ScratchTheHardway\pygame00
python visual_file_packing.py
```
