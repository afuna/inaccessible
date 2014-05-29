function CodeEditor(textareaId, game) {
    var highlightedLines = [];
    var modifiedCode = [];

    function preprocess(code) {
        var lines = code.split("\n");
        for (var i in lines) {
            var line = lines[i];
            if (line.startsWith("!")) {
                highlightedLines.push(i);
                line = line.replace("!", " ");
            }
            modifiedCode.push(line);
        }
        return modifiedCode.join("\n");
    }

    function highlightLines(editor) {
        for (var i in highlightedLines) {
            var lineNumber = parseInt(highlightedLines[i], 10);
            editor.addLineClass(lineNumber, 'wrap', 'editable');
        }
    }

    this.initialize = function() {
        this.editor = CodeMirror.fromTextArea(document.getElementById(textareaId), {
            theme: 'monokai',
            lineNumbers: true,
            dragDrop: false,
            smartIndent: false
        });

        this.editor.on("changes", function(editor) {
            game.update(editor.getValue());
        });

        game.update(this.editor.getValue());
    };

    this.loadCode = function(code) {
        this.editor.setValue(preprocess(code));
        highlightLines(this.editor);
    };

    this.initialize();
};