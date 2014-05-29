(function($, window, undefined) {
    $(document).ready(function() {
        var game = new Game("puzzlePane", "flavorText");
        game.loadLevel(1);
    });
})(jQuery, window)
