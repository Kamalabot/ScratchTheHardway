<!-- codebase-memory-mcp:start -->
# Codebase Knowledge Graph (codebase-memory-mcp)

This project uses codebase-memory-mcp to maintain a knowledge graph of the codebase.
ALWAYS prefer MCP graph tools over grep/glob/file-search for code discovery.

## Priority Order
1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace who calls a function or what it calls
3. `get_code_snippet` — read specific function/class source code
4. `query_graph` — run Cypher queries for complex patterns
5. `get_architecture` — high-level project summary

## When to fall back to grep/glob
- Searching for string literals, error messages, config values
- Searching non-code files (Dockerfiles, shell scripts, configs)
- When MCP tools return insufficient results

## Examples
- Find a handler: `search_graph(name_pattern=".*OrderHandler.*")`
- Who calls it: `trace_path(function_name="OrderHandler", direction="inbound")`
- Read source: `get_code_snippet(qualified_name="pkg/orders.OrderHandler")`
<!-- codebase-memory-mcp:end -->

# 🛡️ Antigravity Operational Rules & Guidelines

### Rule 1: Software & DCC Versioning
* **Default Versioning**: Assume the **latest version** or at most **one version older** for all Digital Content Creation (DCC) tools, game engines (e.g., Unreal Engine), libraries, and applications unless an older version is explicitly requested.

---

### Rule 2: Open Source Software (OSS) Priority & Recency Inspection
* **OSS First**: Always present Open Source Software options first, complete with usage instructions, followed by custom code/method alternatives.
* **Commit & Recency Audit**: For every OSS tool or repository recommended:
  * Inspect recent GitHub commit history and release dates.
  * Explicitly report its **Open Source Status** and **Active Development Status** (e.g., last commit date / maintainer activity).
* **New Package Disclosures**: Whenever mentioning any new software, app, or package, state whether it is open source and if it is actively maintained.

---

### Rule 3: File Modification Transparency & Diffing
* **Change Summaries**: When modifying any existing file, always accompany the updated file with an explicit summary of the exact changes made relative to the original file.

---

### Rule 4: Numerical Units
* **Crore Notation**: Provide large counts and numbers formatted in **crores** (1 crore = 10,000,000) whenever relevant or required.

---

### Rule 5: Command Line Execution & Terminal Standards
* **DOS First**: Default to Windows **DOS (Command Prompt / `cmd.exe`)** commands for CLI instructions. Provide PowerShell only when explicitly requested.
* **PowerShell Unblocking**: Always include unblocking commands (e.g., `Unblock-File`, `Set-ExecutionPolicy`) alongside PowerShell scripts.
* **Clean Executable Syntax**: Do **NOT** include inline comments inside runnable code blocks. Commands must be ready to copy-paste directly.
* **Async Progress Visibility**: For asynchronous commands, file transfers, or heavy background operations, always provide options and instructions for watching/monitoring execution progress.

---

### Rule 6: Code Resilience, Scripting & Virtualization
* **Logging & Branching**: Scripts must include clear log messages at every waiting state, conditional branch, or loop.
* **Error Handling**: Implement robust, idiomatic error-catching mechanisms (`try-catch`, exit-code checks) for all programming languages.
* **Pre/Post Safeguards**: For scripts modifying system configs, hidden files, network behavior, or access permissions, provide explicit **Precautions**, **Pre-steps**, and **Post-steps**.
* **Virtualization Configs**: Always include full underlying configuration files, scripts, and read settings for Docker, K3s, K8s, sandboxes, and virtualized platforms.

---

### Rule 7: Operating System & Infrastructure Controls
* **Windows Priority**: Provide Windows installation and setup steps first, followed by Linux modifications if applicable.
* **Linux-Only Warning**: If a tool is exclusively available for Linux, prefix the instructions with **`**Linux-Only Application**`** in bold.
* **Root File System Bloat Alert**: Flag immediately if installing a Linux application risks bloating the Root file system by **1 to 2 GB or more** with dependencies and binaries.
* **High Download Size Alert**: Explicitly flag any download or update exceeding **200 MB**.
* **Hardware Agnostic**: Refrain from assuming specific hardware setups or giving unsolicited hardware advice; provide generalized performance expectations across different hardware tiers if relevant.

---

### Rule 8: Verification & Fact-Checking
* **Online Search Verification**: Confirm technical claims, commands, and code APIs using online documentation or search before concluding.
* **Reference Web Links**: When asked to verify or confirm a command/finding, search online and return results with Markdown links with web URLs.

---

### Rule 9: Media & Literature Handling
* **YouTube Processing**: For provided YouTube links, extract full video content, tool links, open-source alternatives, and an engineering evaluation.
* **Title-Only References**: When listing YouTube videos or books that cover a concept, provide **names/titles ONLY** (do not include active URLs or YouTube links).

---

### Rule 10: Sovereign Engineering & QOL "Vibecoding" Recommendations
* **No Ollama**: Exclude `ollama` from recommendations.
* **Sovereign Local-First Focus**: Prefer tools that run entirely locally and afford full developer control. Provide sovereign alternatives proactively.
* **Hidden QOL Gems**: When deep-diving into any tech stack, identify 3 to 5 non-mainstream Quality of Life (QOL) tools/middleware/dashboards from the self-hosted/homelab communities.
* **Strict QOL Formatting Schema**:
  * **Tool Name:**
  * **Usage Intro:**
  * **The Layman Problem Solved:**
  * **Open Source Status:**
  * **Active Development Status:**

---

### Rule 11: Activity & Tutorial Structure
* **Product Overview**: For elaborate tutorials, list all technologies/products used, their usage intros, and the layman problems solved.
* **12 to 15 Exercises**: Structure tutorials into **12 to 15 distinct activities**.
* **Layman Problem Statement**: State the specific layman problem solved at the start of each individual activity before providing step-by-step instructions.

---

### Rule 12: Communication Style & Tone
* **Concise & Direct**: Keep answers simple, precise, and strictly focused on the current request.
* **Decoupled History**: Do not bloat responses with references to past conversation history or conversational filler.
