
# InteractiveMentor

InteractiveMentor is an experimental platform for building **AI-powered mentors** with real-time interaction.  
The goal is to create a digital mentor that can guide, teach, and converse naturally with learners using a combination of **3D avatars, speech, and AI models**.

---

## ✨ Features

- 🧠 **AI Conversations** – Natural conversation powered by LLMs (OpenAI, etc.)
- 🗣️ **Text-to-Speech (TTS)** – Converts mentor responses into realistic speech
- 👄 **Lip Sync & Facial Animation** – Matches avatar expressions with speech
- 🖼️ **3D Interactive Avatar** – Mentor is represented as a digital human using WebGL / Three.js
- 📚 **Learning Mode** – Supports Q&A and guided lessons
- ⚡ **Real-time Interaction** – Low-latency communication loop for smooth experience
---

## 🚀 Getting Started
    1. Clone the repository
        git clone https://github.com/Vaanar24/InteractiveMentor.git
        cd InteractiveMentor
---
    2. Install dependencies
        npm install
--- 
    3. Set up environment variables
    Create a .env.local file and configure API keys:
        OPENAI_API_KEY=your_openai_api_key
        ELEVENLABS_API_KEY=your_elevenlabs_api_key
---    
    4. Run the development server
        npm run dev
        Then open http://localhost:3000 in your browser.
---

## 🛠️ Tech Stack
    Next.js: React framework for web app
    React Three Fiber: 3D rendering
    OpenAI API: Conversational intelligence
    ElevenLabs TTS: Realistic text-to-speech
    TailwindCSS: Styling
---

## 📌 Roadmap
* Add gesture & emotion system for avatars
* Multi-language support
* Persistent mentor memory
* Lesson templates for different subjects
* Deploy as a full-stack learning platform
