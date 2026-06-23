# AI Workspace Architecture & Boundaries

## 1. Project Persona & Scope
- **Project Name:** VetCardioHub Website - focused on veterinary cardiology all aspects, designed to be a hub for vets and owners and cardiologists
- **Type:** Local monolithic full-stack website containing html blogs and custom web tools/apps - echocalculator and health tracker apps so far.
- **Hosting / Control:** Stored locally on laptop, mirrored via GitHub.
- **Tech Stack:** Plain HTML/JS, alpine in the calculator and tracker apps

## 2. Structural Mapping (Context Guide)
When analyzing this project, respect the following layout. Do not alter files outside the designated scope of a prompt.
- `/blog-posts/` -> Contains content assets. Do not change frontmatter schemas unless asked.
- `/js/` -> Code for web utilities and miniature apps.
- `/images/` -> Static assets, images, and global styles.
- `/partials/` -> repeating sections (header, footer and glossary display windows) kept constant across whole site
- `/downloads/` -> tools for download - tracking and monitoring guides

## 3. Mandatory Safety & Operational Constraints
To prevent app breakage, the AI MUST strictly adhere to these execution rules:
- **No Autonomous Destruction:** Never rewrite, refactor, or delete entire code blocks to fix a minor issue. Target only the specific lines requiring changes.
- **One File at a Time:** You are forbidden from modifying multiple files simultaneously. Fix one file, present it for review, and wait for human confirmation.
- **Zero-Guessing Policy:** If a local dependency, variable, or package version is unclear, STOP and ask the user. Do not invent mock data or placeholder code.
- **Terminal Lockdown:** Do not attempt to run build commands (`npm run build`, `pytest`, etc.) or install new dependencies without explicit chat permission.

## 4. Coding & Workflow Standards
- **Keep it Simple:** Prefer vanilla, readable code structures over overly complex abstractions.
- **Preserve Comments:** Do not remove existing comments or documentation from the local code.
- **State Management:** When modifying tools/apps, ensure local state or browser storage (`localStorage`) boundaries are not broken.
- **Current preference** - while learning this method of AI use please default to manual editing (give the find and replace sections) rather than automate the updates
-**Be efficient with token use** - currently using a fairly low tier access as a trial and because this is a hobby not a business
