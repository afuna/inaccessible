function CodeEditor(textareaId, game) {

    this.initialize = function() {
        this.editor = CodeMirror.fromTextArea(document.getElementById(textareaId), {
            theme: 'neo',
            lineNumbers: true,
            dragDrop: false,
            smartIndent: false
        });

        this.editor.on("changes", function(editor) {
            game.update(editor.getValue());
        })
        game.update(this.editor.getValue());
    }

    this.initialize();
};