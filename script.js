const textInput = document.getElementById('text-input');
const convertBtn = document.getElementById('convert-btn');
const audio = document.getElementById('audio');
const voiceSelect = document.getElementById('voice-select');

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
        } else {
            alert('Selected voice not found.');
        }
    } else {
        alert('Please enter some text to convert to speech.');
    }
});
// Pause/resume speech when the audio element is clicked
audio.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    } else {
        speechSynthesis.resume();
    }
});
