function Game(puzzlePaneId) {
    this.initialize = function() {
        this.puzzlePane = document.getElementById(puzzlePaneId);
    };

    this.update = function(string) {
        this.puzzlePane.innerHTML = string;
    }

    this.initialize();
};