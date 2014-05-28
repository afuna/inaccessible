(function($, window, undefined) {
    function updatePuzzle() {
        $("#canvas").html($("#code-editor").val())
    }

    $(document).ready(function() {
        $("#code-editor").keypress(function() {
            window.requestAnimationFrame(updatePuzzle);
        });

        updatePuzzle();
    });
})(jQuery, window)
