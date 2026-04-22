# 🎨 Visionary Art AI Agent

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/)
[![Stability AI](https://img.shields.io/badge/Stability%20AI-000000?style=for-the-badge&logo=stability-ai&logoColor=white)](https://stability.ai/)

![Visionary AI Banner](./public/banner.png)

> **Transform your imagination into high-fidelity visual art using the power of Stable Diffusion XL and a state-of-the-art professional UI.**

---

## ✨ Features

- 🎭 **Modern AI-Native UI**: A sleek, bento-style interface designed for focus and creativity.
- 🌓 **Dynamic Theming**: Seamlessly switch between **Light** and **Dark** modes for the perfect workspace environment.
- 🚀 **SDXL Integration**: Powered by Stability AI's Stable Diffusion XL via Hugging Face Inference API.
- 🛠️ **Professional UX**:
  - High-detail descriptive prompt area (Textarea support).
  - Real-time loading feedback with custom blur and shimmer effects.
  - Robust error handling with contextual alerts.
  - Smooth 300ms micro-animations for a premium feel.

---

## 🛠️ Tech Stack

- **Core**: React 19 + Vite 8
- **Styling**: Vanilla CSS with modern flex/grid layouts and CSS variable tokens.
- **API**: Hugging Face Inference API (NScale Router).
- **Fonts**: Inter (UI) & Outfit (Headers) via Google Fonts.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [Hugging Face API Token](https://huggingface.co/settings/tokens)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/aviiixbuilds/Image-generation-Agent.git

# Navigate to the project
cd Image-generation-Agent

# Install dependencies
npm install
```

### 3. Configuration
Create a `.env` file in the root directory (or use the existing one) and add your token:
```env
VITE_HF_TOKEN=your_hugging_face_token_here
```

### 4. Launch
```bash
npm run dev
```
Open `http://localhost:5175` to start creating!

---

## 📸 Interface Preview

<div align="center">
  <img src="./public/banner.png" width="80%" alt="Interface Screenshot" style="border-radius: 12px; border: 1px solid #e2e8f0;"/>
</div>

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Designed with ❤️ by [Aviral Dwivedi](https://github.com/aviiixbuilds)
