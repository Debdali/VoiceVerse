const textInput = document.getElementById('text-input');
const convertBtn = document.getElementById('convert-btn');
const audio = document.getElementById('audio');
const voiceSelect = document.getElementById('voice-select');
const pauseResumeBtn = document.getElementById('pause-resume-btn');
const stopBtn = document.getElementById('stop-btn');
const progressBar = document.getElementById('progress-bar');

let utterance = null;
// Populate voice options
function populateVoiceList() {
    const voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Convert text to speech
convertBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.name === selectedOption);

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            speechSynthesis.speak(utterance);
            updateProgressBar();
            utterance.onend = () => {
                resetProgressBar();
            };
        } else {
            alert('Selected voice not found.');
        }
    } else {
        alert('Please enter some text to convert to speech.');
    }
});
// Pause/resume speech when the audio element is clicked
pauseResumeBtn.addEventListener('click', () => {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
        pauseResumeBtn.textContent = 'Pause';
    } else {
        speechSynthesis.pause();
        pauseResumeBtn.textContent = 'Resume';
    }
});

// Stop speech
stopBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
    resetProgressBar();
});

// Update progress bar based on speech progress
function updateProgressBar() {
    progressBar.value = (utterance.elapsedTime / utterance.duration) * 100;
}

// Reset progress bar
function resetProgressBar() {
    progressBar.value = 0;
}