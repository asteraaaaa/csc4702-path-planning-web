
# CSC4702 — Guiding the Way: Path Planning & Navigation

This repository contains our **CSC4702 Robotic System Development group project**, focused on **communicating core robotics concepts across different audiences** through videos, interaction, and comparison.

The project demonstrates how **the same navigation problem** can be explained and understood differently depending on the learner’s background — from beginner intuition to technical planning.

🌐 **Live Site (GitHub Pages):**  
https://asteraaaaa.github.io/csc4702-path-planning-web/

---

## 📌 Project Overview

Robots do not “think” like humans — but they do make decisions.

This project explores **two fundamental navigation approaches**:

- **Reactive Navigation** — acting based only on what is sensed now  
- **A\* Path Planning** — planning ahead using a global map and cost functions  

Using a **consistent maze metaphor**, we show how changing *how a robot decides* changes the path it takes — even when the goal stays the same.

---

## 🎯 Objectives

- Translate robotics fundamentals into **clear explanations for different audiences**
- Compare **local (reactive)** vs **global (planning)** decision-making
- Provide **interactive visualisations** to reinforce learning
- Create an **engagement platform** that works both online and offline

---

## 🧩 Platform Structure

The website is organised into the following sections:

### 🏠 Home
- Project introduction and narrative framing
- Overview of navigation strategies

### 🎥 Video Gallery
- Two educational videos targeting different audiences:
  - **Reactive Navigation** (Beginner / Junior learners)
  - **A\* Path Planning** (Undergraduate / Technical)
- Videos are embedded locally and hosted via GitHub Pages

### 🤖 Reactive Navigation
- Intuition-based explanation
- Rule-based decision loop (Sense → Rule → Act)
- Story metaphor: *walking in the dark*

### 🧠 A\* Path Planning
- Planning-based explanation
- Grid representation and cost reasoning
- Introduction to `g(n)`, `h(n)`, and `f(n)`

### 🧪 Interactive
- Build your own world: place a start, a goal and walls on a grid
- Run, step through, stop or reset each algorithm and watch how it explores
- Eleven algorithms in three families:

| Family | Algorithms |
| --- | --- |
| Reactive / local (no global map) | Wall following, Bug algorithm, Dynamic Window Approach (DWA) |
| Graph / grid-based | BFS, DFS, Dijkstra, Greedy best-first, A\* |
| Sampling-based (continuous space) | PRM, RRT, RRT\* |

### 🎯 Challenges
- Mini prediction tasks
- Learners guess the robot’s next move before it acts
- Reinforces understanding through active thinking

### 📝 Reflection
- Outreach intent and communication strategy
- Individual reflections from each team member
- Learning outcomes and project insights

---

## 🛠️ Technologies Used

- **React 19 + TypeScript**
- **Vite**
- **React Router** (hash routing, so every page works on GitHub Pages)
- **Tailwind CSS 4** and **Radix UI** primitives
- **Lucide Icons**
- **GitHub Pages** (deployment via the `gh-pages` branch)

---

## 🚀 Run Locally

Requires **Node.js 20.19+** (needed by Vite 7).

```bash
npm ci            # install dependencies
npm run dev       # start the dev server, then open the URL it prints
npm run build     # type-check and build into dist/
npm run preview   # serve the production build locally
npm run lint      # lint
npm run deploy    # publish dist/ to the gh-pages branch (maintainers)
```

The videos are served from `public/`, so they also play in a local copy without internet.

---

## 📁 Project Structure

```
csc4702-path-planning-web/
├── public/
│   ├── reactive-navigation.mp4
│   ├── astar-navigation.mp4
│   └── vite.svg
├── src/
│   ├── components/        # page sections, grid and sampling visualisations, UI primitives
│   ├── pages/             # Home, Videos, Reactive, A*, Interactive, Challenges, Reflection
│   ├── utils/             # pathfinding.ts, reactiveAlgorithms.ts, samplingAlgorithms.ts
│   ├── types/             # algorithm metadata
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── vite.config.js
├── package.json
└── README.md
```

`dist/` is the production build. It is not committed; `npm run deploy` publishes it to the `gh-pages` branch.

---

## 👥 Team Members & Roles

- **Nurul Izzah Mardhiyyah binti Mahmud (223368)**  
  *Team Lead, Interactive Website Development*

- **Adibah Nawal binti Muhammad Lukman (224048)**  
  *Storytelling, Beginner Content, Videos*

- **Loh Qiao En (SA00027)**  
  *Interactive Page Design, UI Logic*

- **Filzah Irdina Binti Ramdan (224233)**  
  *Challenge Design, Evaluation, Structure*

- **Ba Yulin (225789)**  
  *Comparison Analysis, Optimisation Insight*

---

## 📚 Learning Outcomes

Through this project, we learned how to:

- Adapt **technical content** for different audiences
- Design explanations that prioritise **intuition before formulas**
- Use interaction to reveal **algorithmic thinking**
- Bridge theory and practice through **visual decision-making**

The same robot appears throughout the platform — only the **depth of explanation changes**.

---

## ✅ Submission Notes

- Videos are stored in the repository and embedded in the platform
- Website is accessible via GitHub Pages
- Platform supports both **online viewing** and **local deployment** (`npm run preview`)
- Designed to meet CSC4702 project requirements

---

## 📜 Licence

[MIT](LICENSE)

---

> *“Instinct helps a robot move. Planning helps it arrive.”*
```
