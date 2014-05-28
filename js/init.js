(function($, window, undefined) {
    function updatePuzzle() {
        $("#canvas").html($("#code-editor").val())
    }

    $(document).ready(function() {
        $("#code-editor").keypress(function() {
            window.requestAnimationFrame(updatePuzzle);
        });

        var editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
            theme: 'neo',
            lineNumbers: true,
            dragDrop: false,
            smartIndent: false
        });

        updatePuzzle();
    });
})(jQuery, window)
