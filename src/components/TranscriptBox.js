export default class TranscriptBox {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.previousText = "";
    }

    // Reemplaza todo el texto y resalta lo nuevo
    setText(text) {
        // Detecta la palabra nueva
        let newWord = "";
        if (text.length > this.previousText.length) {
            newWord = text.slice(this.previousText.length);
        }

        this.container.innerHTML = ""; // Limpiar

        const p = document.createElement("p");

        // Texto previo normal
        const prevSpan = document.createElement("span");
        prevSpan.textContent = this.previousText;
        p.appendChild(prevSpan);

        // Nueva palabra resaltada
        if (newWord.trim() !== "") {
            const highlightSpan = document.createElement("span");
            highlightSpan.textContent = newWord;
            highlightSpan.classList.add("transcript-highlight");

            // Animación temporal para resaltar como subtítulo flotante
            highlightSpan.style.transition = "background-color 0.5s";
            setTimeout(() => {
                highlightSpan.style.backgroundColor = "transparent";
            }, 800);

            p.appendChild(highlightSpan);
        }

        this.container.appendChild(p);
        this.scrollToBottom();

        // Guardamos como texto previo
        this.previousText = text;
    }

    // Agrega texto al final (para transcripción en tiempo real)
    addText(text) {
        if (!text.trim()) return;

        const p = document.createElement("p");
        p.textContent = text;
        this.container.appendChild(p);
        this.scrollToBottom();

        this.previousText += text;
    }

    // Mantener scroll al final automáticamente
    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    // Limpiar caja
    clear() {
        this.container.innerHTML = "";
        this.previousText = "";
    }
}
