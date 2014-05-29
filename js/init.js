(function($, window, undefined) {
    $(document).ready(function() {
        var startLevel;
        if (document.location.hash) {
            startLevel = /^#level(\d+)/.exec(document.location.hash)[1];
        }

        var game = new Game("puzzlePane", "flavorText", startLevel);

        window.onpopstate = function(e) {
            if(e.state) {
                game.loadLevel(e.state.level);
            } else {
                game.loadLevel(0);
            }
        }
    });
})(jQuery, window)
