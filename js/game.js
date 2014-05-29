function Game(puzzlePaneId, flavorTextPaneId, startLevel) {
    var levelNumberToName = [
        "runaway-keyhole"
    ];

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

        $(".begin").click(function() {
            game.loadLevel(1);
        });
    };

    this.update = function(string) {
        this.puzzlePane.innerHTML = string;
    };

    this.setFlavorText = function(string) {
        this.flavorTextPane.innerHTML = "> " + string;
    };

    this.loadLevel = function(levelNumber) {
        var game = this;
        var levelName = levelNumberToName[levelNumber - 1];

        $.getScript("levels/" + levelName + "/level.js")
            .done(function() {
                game.setFlavorText(levelData.flavorText);
                game.editor.loadCode(levelData.code);
                if (typeof levelData.onLevelStart == "function") {
                    levelData.onLevelStart(game);
                }
                game.level += 1;
            });
        $('head').append('<link rel="stylesheet" href="levels/' + levelName + '/level.css" type="text/css" />');
        $('body').removeClass(function(i, className) {
            return className.startsWith("level");
        }).addClass("level-" + levelName);
    };

    this.initialize();
};