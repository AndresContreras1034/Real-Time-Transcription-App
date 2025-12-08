# Real-Time Transcription App

A web application that captures audio from your microphone (or system) and transcribes it into text in real time. Built with **Vite**, modern JavaScript, and the Web Speech API. Ideal for meetings, online videos, or lectures.  

---

## Features

- Real-time transcription: Converts spoken words to text instantly.
- Live display: Text appears dynamically in the browser.
- Start/Stop controls: Easily manage transcription sessions.
- Lightweight and fast: Built with Vite for quick development and optimized performance.
- Cross-browser support: Works on most modern browsers with microphone access.

---

## Folder Structure

```
transcriptor-app/
│
├─ index.html
├─ vite.config.js
├─ package.json
├─ public/
│ ├─ favicon.ico
│ └─ assets/
│    ├─ logo.png
│    └─ example.mp3
├─ src/
│ ├─ main.js
│ ├─ App.vue # or App.js if using vanilla JS
│ ├─ css/
│ │ └─ style.css
│ ├─ components/
│ │ └─ TranscriptBox.vue
│ └─ utils/
│    └─ speech.js
├─ tests/
│ └─ app.test.js
└─ README.md
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```
Open your browser at the URL shown in the terminal (usually http://localhost:5173).

### 3. Build for Production

```bash
npm run build
```
This will generate an optimized dist/ folder ready for deployment.

---

## Usage

- Click the Start button to begin capturing audio.
- Speak into your microphone (or play system audio if configured).
- The live transcription will appear in the text box.
- Click Stop to end the session.

---

## Notes

- Make sure your browser has permission to access the microphone.
- For system audio transcription, you may need a virtual audio device (e.g., VB-Audio Cable on Windows).
- Currently optimized for modern browsers that support the Web Speech API.

---

## Technologies

- Vite – Fast build tool and development server
- Web Speech API – Real-time speech recognition
- HTML, CSS, and Vanilla JavaScript (or Vue/React optional)

---

## License

This project is licensed under the MIT License.
