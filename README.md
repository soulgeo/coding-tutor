
# Coding Tutor

An interactive Python learning platform designed for absolute beginners.

## Overview
Coding Tutor is a web-based educational application that provides a structured introduction to Python programming. It combines theoretical instruction with a sandboxed coding environment, allowing students to practice and validate their skills in real-time.

## Demo
https://github.com/user-attachments/assets/d68c3b42-b557-4c4a-8554-3dce0c548437

## Key Features
- **Structured Curriculum:** 6 progressive units covering Python foundations, logic, loops, collections, and functions.
- **Interactive Missions:** Real-time code execution and validation using a sandboxed environment.
- **Adaptive Hint System:** Intelligent feedback that provides hints after multiple failed attempts.
- **Personalized Dashboard:** Track progress, completed lessons, and performance metrics with circular progress indicators.
- **Modern UI:** Clean, dual-pane learning environment designed for focus and readability, with custom syntax highlighting and responsive design.
- **Secure Execution:** Uses a dockerized Piston engine to run user code safely in an isolated environment.

## Technical Stack
- **Frontend:** React (TypeScript), Tailwind CSS, DaisyUI, Lucide icons.
- **Execution Layer:** Dockerized Piston engine for secure code execution.
- **Persistence Layer:** Google Firebase (Authentication & Firestore).
- **Content:** Lessons authored in Markdown with YAML headers, synchronized via a custom Node.js pipeline.

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- Firebase Project (credentials required in `.env`)

### Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/soulgeo/coding-tutor.git
   cd coding-tutor
   ```
2. **Configure Environment Variables:**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the Infrastructure (Piston & App):**
   ```bash
   docker-compose up -d
   ```
   *Note: This will start Piston and automatically install the Python 3.12 runtime.*
5. **Synchronize Lessons to Firebase:**
   ```bash
   node sync_lessons.js
   ```
6. **Access the application:**
   The application will be available at [http://localhost:8000](http://localhost:8000).

## Curriculum Structure
1. **Unit 1: Python Foundations** – Variables and printing.
2. **Unit 2: Decision Making** – Logical operators and conditionals.
3. **Unit 3: Loops & Automation** – For/While loops and range().
4. **Unit 4: Data Collections** – Working with lists.
5. **Unit 5: Reusable Tools** – Functions and modularity.
6. **Unit 6: Building Projects** – Final practical exercises.

## Documentation
Detailed technical documentation and pedagogical design choices are available in the `docs/main.pdf` file.

---
*Developed by Georgios Soulantikas - April 2026*
