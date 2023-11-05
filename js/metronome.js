document.addEventListener("DOMContentLoaded", function() {
    const tempo = document.querySelector(".tempo");
    const tempoDescription = document.querySelector(".tempo-description");
    const decreaseTempo = document.querySelector(".decrease-tempo");
    const increaseTempo = document.querySelector(".increase-tempo");
    const slider = document.querySelector(".slider");
    const subtractBeat = document.querySelector(".subtract-beat");
    const addBeat = document.querySelector(".add-beat");
    const beatsPerMeasureCount = document.querySelector(".beats-per-measure");

    const bpmIncreaseWhenHoldingSpeed = 70;
    const bpmButtonRequiredHoldingTime = 300;

    let bpm = 140;
    let minBPM = 20;
    let maxBPM = 260;

    let beatsPerMeasure = 4;
    let minBeatsPerMeasure = 1;
    let maxBeatsPerMeasure = 12;

    let tempoDescriptionString = "Allegro";

    function updateTempo() {
        tempo.textContent = bpm;
        slider.value = bpm;

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
        }
    });

    addBeat.addEventListener("click", () => {
        if (beatsPerMeasure < maxBeatsPerMeasure) {
            beatsPerMeasure++;
            beatsPerMeasureCount.textContent = beatsPerMeasure;
        }
    });
});