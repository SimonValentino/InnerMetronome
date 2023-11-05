class Timer {
    constructor(callback, timeInterval, options) {
        this.timeInterval = timeInterval;

        this.start = () => {
            this.expected = Date.now() + this.timeInterval;
            this.theTimeout = null;
            this.timeout = setTimeout(this.round, this.timeInterval);

            callback();
        };

        this.stop = () => {
            clearTimeout(this.timeout);
        };

        this.round = () => {
            let drift = Date.now() - this.expected;
            if (drift > this.timeInterval && options.errorCallback) {
                options.errorCallback();
            }
            callback();
            this.expected += this.timeInterval;
            this.timeout = setTimeout(this.round, this.timeInterval - drift);
        };
    }
}

export default Timer;