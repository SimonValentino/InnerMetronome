document.addEventListener("DOMContentLoaded", function() {
    const startStopButton = document.getElementById("start-stop");
    const tempoInput = document.getElementById("tempo");
    let metronomeInterval;
    let isPlaying = false;

    startStopButton.addEventListener("click", function() {
        if (isPlaying) {
            clearInterval(metronomeInterval);
            isPlaying = false;
            startStopButton.textContent = "Start";
        } else {
            const bpm = parseInt(tempoInput.value);
            const delay = 60000 / bpm; // Calculate the delay in milliseconds
            let tickCount = 0;

            metronomeInterval = setInterval(function() {
                // Visualization: Alternating background color for ticks
                const tick = document.createElement("div");
                tick.classList.add("metronome-tick");

                if (tickCount % 4 === 0) {
                    tick.classList.add("accented-tick"); // Highlight every 4th tick
                }

                document.querySelector(".metronome").appendChild(tick);
                setTimeout(function() {
                    tick.remove();
                }, delay / 2); // Remove the tick after half of the delay
                tickCount++;

            }, delay);

            isPlaying = true;
            startStopButton.textContent = "Stop";
        }
    });
});