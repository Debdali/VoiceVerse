const startSpeechBtn = document.getElementById('start-speech-btn');
const speechTextOutput = document.getElementById('speech-text-output');

// Initialize SpeechRecognition object
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;

// Event listener for speech-to-text button
startSpeechBtn.addEventListener('click', () => {
    recognition.start();
});

// Update the textarea with the recognized speech
recognition.onresult = function(event) {
    const currentText = speechTextOutput.value;
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        speechTextOutput.value = currentText + transcript;
    }
};
