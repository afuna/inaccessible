function Game(puzzlePaneId, flavorTextPaneId) {
    this.initialize = function() {
        this.puzzlePane = document.getElementById(puzzlePaneId);
        this.flavorTextPane = document.getElementById(flavorTextPaneId);
        this.editor = new CodeEditor("code-editor", this);
    };

    this.update = function(string) {
        this.puzzlePane.innerHTML = string;
    };

    this.loadLevel = function(levelNumber) {
        var game = this;
        $.getScript("/levels/level" + levelNumber + ".js")
            .done(function() {
                game.flavorTextPane.innerHTML = "> " + levelData.flavorText;
                game.editor.loadCode(levelData.code);
                if (typeof levelData.onLevelStart == "function") {
                    levelData.onLevelStart(game);
                }
            })
        $('head').append('<link rel="stylesheet" href="levels/level' + levelNumber + '.css" type="text/css" />');
        $('body').removeClass(function(i, className) {
            return className.startsWith("level");
        }).addClass("level" +levelNumber)
    };

    this.initialize();
};