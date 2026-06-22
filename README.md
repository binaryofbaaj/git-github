# Git & GitHub Visual Learning Site 🚀

An interactive, responsive, and completely self-contained static website designed to teach Git and GitHub concepts to absolute beginners. Built from the ground up without complex frameworks or build steps, it's designed to feel premium, visual, and highly interactive.

## 🎯 Features

- **20 Progressive Chapters**: Guided learning from "What is Git?" through Branching, Merging, Remotes, Pull Requests, History, SSH keys, and Best Practices, ending with a comprehensive Cheat Sheet.
- **Interactive Simulators**: Built-in interactive components to practice:
  - Making commits (visual commit log builder)
  - Creating and switching branches (live tree representation)
  - Solving merge conflicts
  - Writing and merging Pull Requests
  - Searching/filtering cheatsheet commands in real-time
- **Rich Aesthetics**: Responsive dark mode design inspired by GitHub's dark mode palette, smooth micro-animations, color-coded danger indicators, and clean CSS layouts.
- **Offline & Self-Contained**: Uses raw vanilla HTML, CSS, and JS. Zero dependencies. No `npm install`, compiler, or developer tooling required.
- **Print Optimization**: Dedicated CSS rules for printing the Chapter 20 Cheat Sheet directly into a clean, physical PDF or paper print.
- **Progress Tracking**: Tracks visited chapters using browser `localStorage` and displays completion indicators in the sidebar.

## 🗂️ Project Structure

- `index.html` — Course introduction and roadmap
- `page-01-what-is-git.html` to `page-20-cheatsheet.html` — The 20 chapters
- `style.css` — Centralized premium stylesheet containing all design tokens, animations, widgets, and layout rules
- `main.js` — Shared JavaScript managing interactive widgets, terminal simulation, sidebar navigation, progress tracking, and search functionality

## 🛠️ How to View & Run Locally

Since this is a client-side static site, there is **no build step** and **no setup required**. You have two options to open the site:

### Option 1: Double-Click (Simple)
Simply open the folder on your computer and double-click **`index.html`** to open it directly in your web browser.

### Option 2: Live Server (Recommended)
If you want live-reloading or want to preview via local hostname:
- **VS Code**: Install the "Live Server" extension, open the directory, and click "Go Live" at the bottom right.
- **Python**: Run `python3 -m http.server 8000` in the terminal inside this folder and navigate to `http://localhost:8000`.
- **Node.js**: Run `npx serve` or `npm install -g serve` and run `serve .`.

## 🎨 Theme Details
The design uses:
- **Background**: `#0D1117` (Deep slate)
- **Primary Accent**: `#58A6FF` (GitHub blue)
- **Success Accent**: `#3FB950` (Green)
- **Warning Accent**: `#D29922` (Orange)
- **Danger Accent**: `#F85149` (Red)
- **Purple Accent**: `#BC8CFF` (Purple)
- **Fonts**: `Inter` (UI/body) and `JetBrains Mono` / `Consolas` (codeblocks/terminals)
