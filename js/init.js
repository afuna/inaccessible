(function($, window, undefined) {
    $(document).ready(function() {
        var game = new Game("canvas");
        var editor = new CodeEditor("code-editor", game);
    });
})(jQuery, window)
