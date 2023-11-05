import Timer from "./timer.js"

document.addEventListener("DOMContentLoaded", function() {
    const tempo = document.querySelector(".tempo");
    const tempoDescription = document.querySelector(".tempo-description");
    const decreaseTempo = document.querySelector(".decrease-tempo");
    const increaseTempo = document.querySelector(".increase-tempo");
    const slider = document.querySelector(".slider");
    const startStop = document.querySelector(".start-stop");
    const subtractBeat = document.querySelector(".subtract-beat");
    const addBeat = document.querySelector(".add-beat");
    const beatsPerMeasureCount = document.querySelector(".beats-per-measure");
    const muteEveryOtherToggle = document.getElementById("mute-every-other");
    const muteRandomlyToggle = document.getElementById("mute-randomly");
    const randomMuteSlider = document.querySelector(".random-mute-slider");
    const randomMuteText = document.querySelector(".random-mute-text");

    const downbeat = new Audio("assets/downbeat.mp3");
    downbeat.volume = 1;
    
    const tick = new Audio("assets/tick.mp3");
    tick.volume = 1;
    
    const bpmIncreaseWhenHoldingSpeed = 70;
    const bpmButtonRequiredHoldingTime = 300;
    
    let bpm = 140;
    const minBPM = 20;
    const maxBPM = 260;
    
    let beatsPerMeasure = 4;
    let beatNumber = 1;
    const minBeatsPerMeasure = 1;
    const maxBeatsPerMeasure = 12;
    
    let tempoDescriptionString = "Allegro";
    
    const metronome = new Timer(playTick, 60_000 / bpm, {});
    let isRunning = false;
    
    let muteEveryOther = false;
    let muteRandomly = false;
    let currentMeasureMuted = false;
    let percentMeasuresMuted = 33;
    
    startStop.addEventListener("click", () => {
        beatNumber = 1;

        if (!isRunning) {
            metronome.start();
            isRunning = true;
            startStop.textContent = "Stop";
        } else {
            metronome.stop();
            isRunning = false;
            startStop.textContent = "Start";
        }
    });

    function updateTempo() {
        tempo.textContent = bpm;
        slider.value = bpm;

        metronome.timeInterval = 60_000 / bpm;

        if (bpm < 40) tempoDescriptionString = "Grave";
        else if (bpm < 60) tempoDescriptionString = "Largo";
        else if (bpm < 66) tempoDescriptionString = "Larghetto";
        else if (bpm < 76) tempoDescriptionString = "Adagio";
        else if (bpm < 108) tempoDescriptionString = "Andante";
        else if (bpm < 120) tempoDescriptionString = "Moderato";
        else if (bpm < 168) tempoDescriptionString = "Allegro";
        else if (bpm < 200) tempoDescriptionString = "Presto";
        else if (bpm >= 200) tempoDescriptionString = "Prestissimo";

        tempoDescription.textContent = tempoDescriptionString;
    }

    decreaseTempo.addEventListener("click", () => {
        if (bpm > minBPM) {
            bpm--;
            updateTempo();
        }
    });

    increaseTempo.addEventListener("click", () => {
        if (bpm < maxBPM) {
            bpm++;
            updateTempo();
        }
    });

    let decreaseTempoTimeout;
    let decreaseTempoInterval;

    decreaseTempo.addEventListener("mousedown", () => {
        decreaseTempoTimeout = setTimeout(() => {
            decreaseTempoInterval = setInterval(() => {
                if (bpm <= minBPM) {
                    clearInterval(decreaseTempoInterval);
                    return;
                }
                bpm--;
                updateTempo();
            }, bpmIncreaseWhenHoldingSpeed);
        }, bpmButtonRequiredHoldingTime);
    });

    decreaseTempo.addEventListener("mouseup", () => {
        clearTimeout(decreaseTempoTimeout);
        clearInterval(decreaseTempoInterval);
    });

    decreaseTempo.addEventListener("mouseleave", () => {
        clearTimeout(decreaseTempoTimeout);
        clearInterval(decreaseTempoInterval);
    });

    let increaseTempoTimeout;
    let increaseTempoInterval;

    increaseTempo.addEventListener("mousedown", () => {
        increaseTempoTimeout = setTimeout(() => {
            increaseTempoInterval = setInterval(() => {
                if (bpm >= maxBPM) {
                    clearInterval(increaseTempoInterval);
                    return;
                }
                bpm++;
                updateTempo();
            }, bpmIncreaseWhenHoldingSpeed);
        }, bpmButtonRequiredHoldingTime);
    });

    increaseTempo.addEventListener("mouseup", () => {
        clearTimeout(increaseTempoTimeout);
        clearInterval(increaseTempoInterval);
    });

    increaseTempo.addEventListener("mouseleave", () => {
        clearTimeout(increaseTempoTimeout);
        clearInterval(increaseTempoInterval);
    });

    slider.addEventListener("input", () => {
        bpm = slider.value;
        updateTempo();
    });

    subtractBeat.addEventListener("click", () => {
        if (beatsPerMeasure > minBeatsPerMeasure) {
            beatsPerMeasure--;
            beatsPerMeasureCount.textContent = beatsPerMeasure;
            beatNumber = 1;
        }
    });

    addBeat.addEventListener("click", () => {
        if (beatsPerMeasure < maxBeatsPerMeasure) {
            beatsPerMeasure++;
            beatsPerMeasureCount.textContent = beatsPerMeasure;
            beatNumber = 1;
        }
    });

    function playDownbeat() {
        downbeat.play();
        downbeat.currentTime = 0;
    }

    function playTick() {
        if (beatNumber > beatsPerMeasure || beatNumber === 1) {
            if (muteEveryOther) {
                if (currentMeasureMuted) {
                    currentMeasureMuted = false;
                    playDownbeat();
                } else {
                    currentMeasureMuted = true;
                }
            } else if (muteRandomly) {
                currentMeasureMuted = Math.random() < percentMeasuresMuted / 100;
                if (!currentMeasureMuted) {
                    playDownbeat();
                }
            } else {
                playDownbeat();
            }
            
            beatNumber = 2;
        } else {
            if (!currentMeasureMuted) {
                tick.play();
                tick.currentTime = 0;
            }
            
            beatNumber++;
        }
    }

    muteEveryOtherToggle.addEventListener("change", () => {
        if (muteEveryOtherToggle.checked) {
            muteEveryOther = true;
            muteRandomly = false;
            muteRandomlyToggle.checked = false;
        } else {
            muteEveryOther = false;
        }

        beatNumber = 1;
    });

    muteRandomlyToggle.addEventListener("change", () => {
        if (muteRandomlyToggle.checked) {
            muteRandomly = true;
            muteEveryOther = false;
            muteEveryOtherToggle.checked = false;
        } else {
            muteRandomly = false;
        }

        beatNumber = 1;
    });

    randomMuteSlider.addEventListener("input", () => {
        percentMeasuresMuted = randomMuteSlider.value;
        randomMuteText.textContent = percentMeasuresMuted + "%";
        randomMuteSlider.value = percentMeasuresMuted;
    });
});