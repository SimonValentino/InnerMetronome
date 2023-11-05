const tempo = document.querySelector(".tempo");
const tempoDescription = document.querySelector(".tempo-description");
const decreaseTempo = document.querySelector(".decrease-tempo");
const increaseTempo = document.querySelector(".increase-tempo");
const slider = document.querySelector(".slider");
const startStop = document.querySelector(".start-stop");
const addBeat = document.querySelector(".add-beat");
const subtractBeat = document.querySelector(".subtract-beat");
const measureCount = document.querySelector(".beats-per-measure-text")

let bpm = 140;
let beatsPerMeasure = 4;

decreaseTempo.addEventListener("click", () => {
    bpm--;
    tempo.textContent = bpm;
    slider.value = bpm;
})