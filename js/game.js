function Game(puzzlePaneId, flavorTextPaneId, titleTextPaneId, startLevel) {
    var levelNumberToName = [
        "beginning",
        "runaway-keyhole",
        "pick-your-poison"
    ];

    this.initialize = function() {
        var game = this;

        game.puzzlePane = document.getElementById(puzzlePaneId);
        game.flavorTextPane = document.getElementById(flavorTextPaneId);
        game.titleTextPane = document.getElementById(titleTextPaneId);

        $('head').append("<style id='playerStyles'></style>");
        game.playerStyles = document.getElementById('playerStyles');

        game.editor = new CodeEditor("code-editor", game);
        game.currentLevel = parseInt(startLevel || 0, 10);

        game.loadLevel(game.currentLevel);


        $(game.puzzlePane).on("levelwin", function() {
            game.updateFlavorText("Success! You move on...");
            game.loadLevel(game.currentLevel + 1);
        });
    };

    this.getHeight = function() {
        return $(this.puzzlePane).height();
    };

    this.getWidth = function() {
        return $(this.puzzlePane).width();
    };

    this.updatePuzzlePane = function(string) {
        this.puzzlePane.innerHTML = string;
    };

    this.updatePuzzlePaneStyle = function(string) {
        this.playerStyles.innerHTML = string;
    };

    this.updateFlavorText = function(string) {
        this.flavorTextPane.innerHTML = string;
    };

    this.updateTitleText = function(string) {
        this.titleTextPane.innerHTML = "> " + string;
    };

    this.updateEditor = function(string) {
        this.editor.loadCode(string);
    };

    this.loadLevel = function(levelNumber) {
        var game = this;

        if (!(levelNumber in levelNumberToName)) {
            this.loadLevel(0);
            return;
        }

        var levelName = levelNumberToName[levelNumber];

        $.getScript("levels/" + levelName + "/level.js")
            .done(function() {
                game.updatePuzzlePane("");
                game.updateFlavorText(levelData.flavorText);
                game.updateTitleText(levelData.title);

                game.editor.setCodeType(levelData.codeType);
                game.editor.loadCode(levelData.code);

                if (typeof levelData.onEditorUpdate == "function") {
                    game.editor.onChange(levelData.onEditorUpdate.bind(levelData, game));
                }

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

    this.win = function() {
        $(this.puzzlePane).trigger("levelwin");
    };

    this.initialize();
};