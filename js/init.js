(function($, window, undefined) {
    $(document).ready(function() {
        function getLevelFromURL() {
            if (document.location.hash) {
                return /^#level(\d+)/.exec(document.location.hash)[1];
            }
        }

        var game = new Game("puzzlePane", "flavorText", "titleText", getLevelFromURL());

        window.onpopstate = function(e) {
            game.loadLevel(getLevelFromURL());
        }
    });
})(jQuery, window)
