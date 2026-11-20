import TranscriptBox from "./components/TranscriptBox.js";
import { saveTextAsFile } from "./utils/fileSaver.js";

// Elementos del DOM
const transcriptBox = new TranscriptBox("transcript-box");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const saveBtn = document.getElementById("save-btn");
const audioInput = document.getElementById("audio-file");
const audioPlayer = document.getElementById("audio-player");

// Variables
let currentTranscript = "";

// ==========================
// Web Speech API (Micrófono)
// ==========================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        // Se recorre cada resultado parcial
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
                // Texto final se agrega al transcript
                currentTranscript += result[0].transcript + "\n";
                transcriptBox.setText(currentTranscript);
            } else {
                // Texto provisional se muestra como preview
                transcriptBox.setText(currentTranscript + result[0].transcript);
            }
        }
    };

    recognition.onerror = (event) => {
        console.error("Error de reconocimiento:", event.error);
    };

    startBtn.addEventListener("click", () => {
        currentTranscript = "";
        transcriptBox.clear();
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener("click", () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

} else {
    transcriptBox.setText("Tu navegador no soporta la Web Speech API.");
}

// ==========================
// Guardar manual
// ==========================
saveBtn.addEventListener("click", () => {
    if (currentTranscript.trim() === "") return;
    const filename = `Transcripcion_${new Date().toISOString()}.txt`;
    saveTextAsFile(filename, currentTranscript);
});

// ==========================
// Subir audio local y transcribir (opcional)
// ==========================
audioInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.style.display = "block";
    audioPlayer.play();

    // Backend seguro de transcripción
    const formData = new FormData();
    formData.append("file", file);

    try {
        const transcriptionEndpoint =
            import.meta.env.VITE_TRANSCRIPTION_ENDPOINT;

        if (!transcriptionEndpoint) {
            throw new Error("VITE_TRANSCRIPTION_ENDPOINT no está configurado");
        }

        const response = await fetch(transcriptionEndpoint, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        currentTranscript = data.text || "";
        transcriptBox.setText(currentTranscript);

    } catch (err) {
        console.error("Error transcribiendo audio:", err);
    }
});
