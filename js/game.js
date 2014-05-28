function Game(gameCanvasId) {
    this.initialize = function() {
        this.canvas = document.getElementById("canvas");
    };

    this.update = function(string) {
        this.canvas.innerHTML = string;
    }

    this.initialize();
};