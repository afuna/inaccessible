function Game(puzzlePaneId, flavorTextPaneId, titleTextPaneId, startLevel) {
    var levelNumberToName = [
        "beginning",
        "runaway-keyhole"
    ];

    this.initialize = function() {
        var game = this;

        game.puzzlePane = document.getElementById(puzzlePaneId);
        game.flavorTextPane = document.getElementById(flavorTextPaneId);
        game.titleTextPane = document.getElementById(titleTextPaneId);

        game.editor = new CodeEditor("code-editor", game);
        game.currentLevel = parseInt(startLevel || 0, 10);

        if (game.currentLevel <= levelNumberToName.length ) {
            game.loadLevel(game.currentLevel);
        };

        $(game.puzzlePane).on("levelwin", function() {
            game.updateFlavorText("Success! You move on...");
            game.loadLevel(game.currentLevel + 1);
        });
    };

    this.update = function(string) {
        this.puzzlePane.innerHTML = string;
    };

    this.updateFlavorText = function(string) {
        this.flavorTextPane.innerHTML = string;
    };

    this.updateTitleText = function(string) {
        this.titleTextPane.innerHTML = "> " + string;
    }

    this.loadLevel = function(levelNumber) {
        var game = this;
        var levelName = levelNumberToName[levelNumber];

        $.getScript("levels/" + levelName + "/level.js")
            .done(function() {
                game.updateFlavorText(levelData.flavorText);
                game.updateTitleText(levelData.title);

                game.editor.loadCode(levelData.code, levelData.codeType);

                if (typeof levelData.onLevelStart == "function") {
                    levelData.onLevelStart(game);
                }

                history.pushState({ "level": levelNumber }, levelData.title, "#level" + levelNumber);
                game.currentLevel = levelNumber;
            });
        $('head').append('<link rel="stylesheet" href="levels/' + levelName + '/level.css?_=' + Math.random() + '" type="text/css" />');
        $('body').removeClass(function(i, className) {
            return className.indexOf("level") == 0;
        }).addClass("level-" + levelName);
    };

    this.initialize();
};