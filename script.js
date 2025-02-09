async function translateText() {
    const text = document.getElementById('textInput').value;
    const language = document.getElementById('languageSelect').value;
    const apiKey = 'AIzaSyD4HjBVAbKAWC5wf98ay1b6iveuolmmDCc';  // Replace with your actual API key

    const url = `https://translation.googleapis.com/translate_a/single?client=gtx&sl=it&tl=${language}&dt=t&q=${encodeURIComponent(text)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const translatedText = data[0].map(item => item[0]).join(' ');
        document.getElementById('outputText').innerText = translatedText;
    } catch (error) {
        alert('Translation error');
    }
}

// Recording functions
let recorder;
let audioChunks = [];
let isRecording = false;

function startRecording() {
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (event) {
                    audioChunks.push(event.data);
                };
                recorder.onstop = function () {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    document.getElementById('audioPlayer').src = audioUrl;
                    document.getElementById('audioPlayer').style.display = 'block';
                };
                recorder.start();
                isRecording = true;
                document.getElementById('recordButton').style.display = 'none';
                document.getElementById('stopButton').style.display = 'inline-block';
            })
            .catch(function (error) {
                alert('Could not access microphone');
            });
    }
}

function stopRecording() {
    recorder.stop();
    isRecording = false;
    document.getElementById('recordButton').style.display = 'inline-block';
    document.getElementById('stopButton').style.display = 'none';
}
