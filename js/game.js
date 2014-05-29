function Game(puzzlePaneId, flavorTextPaneId, startLevel) {
    this.initialize = function() {
        var game = this;
        game.puzzlePane = document.getElementById(puzzlePaneId);
        game.flavorTextPane = document.getElementById(flavorTextPaneId);
        game.editor = new CodeEditor("code-editor", game);
        game.currentLevel = startLevel || 1;

        $(game.puzzlePane).on("levelwin", function() {
            game.setFlavorText("Success! You move on...");
            game.loadLevel(game.currentLevel + 1);
        });
        game.loadLevel(game.currentLevel);
    };

    this.update = function(string) {
        this.puzzlePane.innerHTML = string;
    };

    this.setFlavorText = function(string) {
        this.flavorTextPane.innerHTML = "> " + string;
    };

    this.loadLevel = function(levelNumber) {
        var game = this;
        $.getScript("levels/level" + levelNumber + ".js")
            .done(function() {
                game.setFlavorText(levelData.flavorText);
                game.editor.loadCode(levelData.code);
                if (typeof levelData.onLevelStart == "function") {
                    levelData.onLevelStart(game);
                }
                game.level += 1;
            });
        $('head').append('<link rel="stylesheet" href="levels/level' + levelNumber + '.css" type="text/css" />');
        $('body').removeClass(function(i, className) {
            return className.startsWith("level");
        }).addClass("level" +levelNumber);
    };

    this.initialize();
};