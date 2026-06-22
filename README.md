# Git & GitHub Visual Learning Site 🚀

An interactive, responsive, and completely self-contained static website designed to teach Git and GitHub concepts to absolute beginners (non-technical users). Built from the ground up without complex frameworks or build steps, it features high-fidelity visuals, dynamic SVG/CSS diagrams, interactive simulators, persistent progress tracking, and a premium dark/light mode design.

---

## 🎯 Key Project Features

- **20 Progressive Chapters**: Guided syllabus that takes a learner from knowing nothing about terminals to staging files, managing branches, resolving conflicts, proposing Pull Requests, and using best practices.
- **Interactive Widgets & Simulators**: Practice real Git commands in safe, browser-based sandboxes:
  - **Terminal Simulator**: Command-line simulation that parses commands like `git init`, `git status`, `git add`, and `ls -la`, rendering typed text output line-by-line.
  - **Commit Simulator**: Create files, stage them, write custom commit messages, and watch the commit history graph expand.
  - **Branch Tree Visualizer**: Create new branches, switch HEAD pointers, add commits, and see parallel timelines rendered in real-time.
  - **Merge Conflict Resolver**: A step-by-step interactive conflict exercise where users pick "Ours", "Theirs", or "Both", edit conflict markers, and commit the fix.
  - **Pull Request Sandbox**: Write a PR title and description, trigger a mock review comment, post a resolution, and watch a merge animation play out.
  - **Interactive Cheat Sheet Search**: Real-time filtering matching queries across 58 Git commands instantly.
- **Light & Dark Theme Toggle**: Circular navbar toggler button dynamically injected in every header. Saves preference in `localStorage` and automatically shifts the colors of page components and inline SVG diagrams.
- **Glossary Tooltips**: Hover or focus on highlighted terminology (e.g., *Repository*, *Commit*, *Staging Area*) to see definitions, headings, and clear descriptions without leaving the context.
- **Progress Tracking**: Marks pages as completed on visit in the navigation sidebar using `localStorage` checked markers.
- **Print PDF Optimization**: Clean print layouts tailored specifically for printing or exporting Chapter 20 (Cheat Sheet) to physical pages or PDFs.
- **Zero-Dependency Core**: Developed in vanilla HTML5, CSS3, and JavaScript. Runs instantly in any web browser without needing `npm install`, compilers, or background runtimes.

---

## 🗂️ Project Structure & Architecture

```bash
git-github/
│
├── index.html                           # Home page & roadmap timeline
├── README.md                            # Complete project setup documentation
├── style.css                            # Core stylesheet (Design tokens, components, light theme, keyframes)
├── main.js                              # Shared JavaScript (Interactive widgets, theme, footer logic, observer)
│
├── page-01-what-is-git.html             # Ch. 1: What Is Git? (Time machine analogy)
├── page-02-git-vs-github.html           # Ch. 2: Git vs GitHub (Laptop vs Cloud)
├── page-03-installation-setup.html      # Ch. 3: Installation & Setup (Win/Mac/Linux steps)
├── page-04-repository.html              # Ch. 4: Repositories (First tracked folder)
├── page-05-staging-area.html            # Ch. 5: The Staging Area (Suitcase packing analogy)
├── page-06-commits.html                 # Ch. 6: Making Commits (Commit simulator)
├── page-07-branches.html                # Ch. 7: Branches (Branch visualizer tree)
├── page-08-merging.html                 # Ch. 8: Merging (FF vs 3-way merge resolver)
├── page-09-remote-repos.html            # Ch. 9: Remote Repos (GitHub synchronization)
├── page-10-clone-fork.html              # Ch. 10: Clone & Fork (GitHub fork flow)
├── page-11-pull-requests.html           # Ch. 11: Pull Requests (PR simulator flow)
├── page-12-git-log-history.html         # Ch. 12: History & Log (git log & diff)
├── page-13-undoing-changes.html         # Ch. 13: Undoing Changes (reset modes, stash, revert)
├── page-14-gitignore.html               # Ch. 14: .gitignore (VIP list analogy, matching patterns)
├── page-15-tags-releases.html           # Ch. 15: Tags & Releases (Semantic Versioning)
├── page-16-collaboration-workflow.html  # Ch. 16: Team Workflows (GitFlow vs GitHub Flow)
├── page-17-github-features.html         # Ch. 17: GitHub Features (Issues, Actions, Pages, Projects)
├── page-18-ssh-authentication.html      # Ch. 18: SSH & Auth (HTTPS vs SSH handshakes)
├── page-19-best-practices.html          # Ch. 19: Best Practices (Conventional Commits, Hygiene)
└── page-20-cheatsheet.html              # Ch. 20: Cheat Sheet (58 filterable commands reference card)
```

---

## 📖 Guided Syllabus Details

1. **index.html — Home / Welcome Page**
   Welcome banner introducing the visual course, progress roadmap, target audiences, and the classic "Without Git vs With Git" file tree comparison.
2. **page-01-what-is-git.html — 1. What Is Git?**
   Visualizes the chaos of manual backup copies. Explains how Git acts as an infinite-slot timeline. Includes an interactive `git init` folder mockup.
3. **page-02-git-vs-github.html — 2. Git vs GitHub**
   Breaks down the difference between the local terminal tool (Git) and the remote cloud host (GitHub) using a "local recipe book vs cloud community library" analogy.
4. **page-03-installation-setup.html — 3. Installation & Setup**
   Tabbed installation steps for Windows, macOS, and Linux. Teaches terminal terminology (Prompt, Path, Cursor) and configuring basic identity details.
5. **page-04-repository.html — 4. Repositories**
   Detailed description of the hidden `.git` folder (Git's brain). Explains the boundary between normal local folders and repositories.
6. **page-05-staging-area.html — 5. The Staging Area**
   Teaches the concept of staging using the suitcase packing analogy. Includes a step-by-step interactive suitcase packing checklist mapped to file tracking states.
7. **page-06-commits.html — 6. Making Commits**
   Compares commits to game save points. Highlights commit metadata structure (Author, Hash, Timestamp, Message). Features a live commit log editor.
8. **page-07-branches.html — 7. Branches**
   Explains parallel timelines and the HEAD pointer. Features a branch tree creator where users can branch off, make commits, and watch branch paths separate.
9. **page-08-merging.html — 8. Merging**
   Compares Fast-Forward merges to 3-way merges. Features a conflict resolver simulation showing how code conflicts happen and how to resolve them.
10. **page-09-remote-repos.html — 9. Remote Repos**
    Teaches communication between local repos and remote servers. Visualizes fetch, pull, and push commands.
11. **page-10-clone-fork.html — 10. Clone & Fork**
    Compares downloading repositories (cloning) to making a personal server copy (forking) using real-world analogies.
12. **page-11-pull-requests.html — 11. Pull Requests**
    Explains formal change proposal lifecycles. Features a Pull Request simulator that guides users through creating, responding to review comments, and merging.
13. **page-12-git-log-history.html — 12. History & Log**
    Teaches history exploration. Covers `git log`, comparing differences with `git diff`, and tracking lines with `git blame`.
14. **page-13-undoing-changes.html — 13. Undoing Changes**
    The safety net chapter. Explains how to restore files, differences between reset modes (`--soft`, `--mixed`, `--hard`), and safe overrides with `git revert`.
15. **page-14-gitignore.html — 14. .gitignore**
    Explains why build files, system settings, and secrets should be hidden. Lists pattern rules (wildcards, directories) and template guidelines.
16. **page-15-tags-releases.html — 15. Tags & Releases**
    Covers marking milestones and release management. Explains Semantic Versioning rules (`Major.Minor.Patch`).
17. **page-16-collaboration-workflow.html — 16. Team Workflows**
    Compares common branching strategies like GitHub Flow (simple feature branches) and GitFlow (separate dev, release, and hotfix branches).
18. **page-17-github-features.html — 17. GitHub Features**
    Introduces project management tools. Explains issues lifecycles, kanban boards, Actions (CI/CD), Pages hosting, and wikis.
19. **page-18-ssh-authentication.html — 18. SSH & Auth**
    HTTPS vs SSH comparison. Uses a lock-and-key analogy to explain keys generation and public-key addition on GitHub.
20. **page-19-best-practices.html — 19. Best Practices**
    Covers clean developer habits. Covers Conventional Commits styling guidelines, hygiene checklists, and descriptive branch naming schemes.
21. **page-20-cheatsheet.html — 20. Cheat Sheet**
    The reference cards summary. Organizes 58 commands by workflow phase, showing syntax, description, safety levels, and instant copy/print buttons.

---

## 🛠️ How to View & Run Locally

Since this project consists of client-side static files, **no build systems, node scripts, or pre-processing steps are required**. You can open the project in two ways:

### Option 1: Double-Click (Local Preview)
Navigate into this folder on your computer and double-click **`index.html`** to open the visual guide directly in your default web browser.

### Option 2: Local Static Server (Recommended)
Running the site on a local web server resolves cross-origin script boundaries in some browsers and supports proper local storage state updates.
- **Python Server**: Run the following command in your terminal inside this folder:
  ```bash
  python3 -m http.server 8000
  ```
  Then navigate your browser to `http://localhost:8000`.
- **Node.js serve**: Run:
  ```bash
  npx serve .
  ```
  Then navigate to `http://localhost:3000`.
- **VS Code Extension**: Install the **Live Server** extension, open this folder in VS Code, and click the **Go Live** status bar button.

---

## 🎨 Theme & Typography Style Specifications

The visual system maps directly to modern dark/light web principles:

| Theme Variable | Dark Mode Value (Default) | Light Mode Value |
| :--- | :--- | :--- |
| `--bg-primary` | `#0D1117` (Deep Slate) | `#FFFFFF` (Pure White) |
| `--bg-surface` | `#161B22` (Card surface) | `#F6F8FA` (Light gray) |
| `--bg-surface-raised`| `#1C2129` (Raised components) | `#EFF2F5` (Soft grey) |
| `--border-default` | `#30363D` (Medium slate) | `#D0D7DE` (Divider grey) |
| `--text-primary` | `#E6EDF3` (Soft white) | `#1F2328` (Charcoal) |
| `--text-secondary` | `#8B949E` (Slate grey) | `#57606A` (Medium grey) |
| `--accent-blue` | `#58A6FF` (Bright Blue) | `#0969DA` (Deep Blue) |
| `--accent-green` | `#3FB950` (Green) | `#1A7F37` (Dark Green) |
| `--accent-red` | `#F85149` (Red) | `#CF222E` (Dark Red) |
| `--accent-orange` | `#D29922` (Orange) | `#9A6700` (Dark Orange) |
| `--accent-purple` | `#BC8CFF` (Purple) | `#8250DF` (Dark Purple) |

### Typography Details
- **UI & Body Texts**: Google Font `Inter` (sans-serif)
- **Terminal Inputs & Code Elements**: Google Font `JetBrains Mono` / `Consolas` (monospace)

---

## 🚀 Pushing This Repository to GitHub

To store this visual course on your remote GitHub account, run these commands in your local shell terminal inside this folder:

1. **Initialize your repository** (if not already done):
   ```bash
   git init
   ```
2. **Add all files to staging**:
   ```bash
   git add .
   ```
3. **Commit the project structure**:
   ```bash
   git commit -m "feat: initial commit of the Git & GitHub visual learning site"
   ```
4. **Set default branch to main**:
   ```bash
   git branch -M main
   ```
5. **Link origin remote** (replace with your personal GitHub account name):
   ```bash
   git remote add origin https://github.com/binaryofbaaj/git-github.git
   ```
6. **Push code to remote server**:
   ```bash
   git push -u origin main
   ```

---

## 📝 Credits & Footers
Built with ❤️ by **baaj** to help everyone learn Git & GitHub. No prior experience needed.
