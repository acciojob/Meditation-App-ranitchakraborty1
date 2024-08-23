//your JS code here. If required.
window.onload = function() {
    const video = document.getElementById('video');
    const playButton = document.querySelector('.play');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.getElementById('time-select');
    const soundPicker = document.querySelector('.sound-picker');

    let sounds = {
        sound1: 'Sounds/beach.mp3',
        sound2: 'Sounds/rain.mp3'
    };

    let videos = {
        sound1: 'Videos/beach.mp4',
        sound2: 'Videos/rain.mp4'
    };

    let currentSound = new Audio(sounds.sound1);
    let duration = 600; // Default 10 minutes in seconds

    // Play and pause the video and sound
    playButton.addEventListener('click', function() {
        if (currentSound.paused) {
            currentSound.play();
            video.play();
            playButton.textContent = 'Pause';
            startTimer(duration);
        } else {
            currentSound.pause();
            video.pause();
            playButton.textContent = 'Play';
            clearInterval(timer);
        }
    });

    // Change sound and video based on selection
    soundPicker.addEventListener('click', function(e) {
        if (e.target.id in sounds) {
            currentSound.pause();
            currentSound = new Audio(sounds[e.target.id]);
            video.src = videos[e.target.id];
            playButton.textContent = 'Play';
            timeDisplay.textContent = formatTime(duration);
        }
    });

    // Set the time for meditation
    timeSelect.addEventListener('click', function(e) {
        if (e.target.id === 'smaller-mins') {
            duration = 120;
        } else if (e.target.id === 'medium-mins') {
            duration = 300;
        } else if (e.target.id === 'long-mins') {
            duration = 600;
        }
        timeDisplay.textContent = formatTime(duration);
    });

    let timer;

    function startTimer(duration) {
        let time = duration;
        timer = setInterval(function() {
            time--;
            timeDisplay.textContent = formatTime(time);
            if (time <= 0) {
                clearInterval(timer);
                currentSound.pause();
                video.pause();
                playButton.textContent = 'Play';
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
};

