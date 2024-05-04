const startSpeechBtn = document.getElementById('convert-btn'); // Corrected ID
const speechTextOutput = document.getElementById('speech-text-output');
const startListeningBtn = document.getElementById('start-listening-btn');
const stopListeningBtn = document.getElementById('stop-listening-btn');
// Initialize SpeechRecognition object
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;

// Add a variable to keep track of whether speech recognition is currently active
let isRecognizing = false;

// Event listener for speech-to-text button
startSpeechBtn.addEventListener('click', () => {
    if (isRecognizing) {
        // If speech recognition is already active, stop it
        recognition.stop();
    } else {
        // If speech recognition is not active, start it
        recognition.start();
    }
    // Toggle the value of isRecognizing
    isRecognizing = !isRecognizing;
});

// Update the textarea with the recognized speech
recognition.onresult = function(event) {
    const currentText = speechTextOutput.value;
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        speechTextOutput.value = currentText + transcript;
    }
};

// Add an event listener for the 'end' event, which is fired when speech recognition stops
recognition.addEventListener('end', () => {
    // Set isRecognizing to false when speech recognition stops
    isRecognizing = false;
});

// Event listener for start listening button
startListeningBtn.addEventListener('click', () => {
    if (!isRecognizing) {
        recognition.start();
        isRecognizing = true;
    }
});

// Event listener for stop listening button
stopListeningBtn.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
        isRecognizing = false;
    }
});
