
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
- Grid-based maze simulation
- Step-by-step visualisation of algorithm behaviour
- Compare how different algorithms explore the same environment

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

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**
- **GitHub Pages** (deployment)

---

## 📁 Project Structure

```

csc4702-path-planning-web/
│
├── public/
│   ├── reactive-navigation.mp4
│   ├── astar-navigation.mp4
│   └── vite.svg
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
│
├── dist/              # Production build (GitHub Pages)
├── vite.config.ts
├── package.json
└── README.md

```

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

- Videos are hosted locally and embedded in the platform
- Website is accessible via GitHub Pages
- Platform supports both **online viewing** and **local deployment**
- Designed to meet CSC4702 project requirements

---

> *“Instinct helps a robot move. Planning helps it arrive.”*
```
