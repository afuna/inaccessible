function CodeEditor(textareaId, game) {
    var editableLines = [];
    var modifiedCode = [];

    function preprocess(code) {
        var lines = code.split("\n");
        for (var i in lines) {
            var line = lines[i];
            if (line.startsWith("!")) {
                editableLines.push(i);
                line = line.replace("!", " ");
            }
            modifiedCode.push(line);
        }
        return modifiedCode.join("\n");
    }

    function highlightLines(editor) {
        for (var i in editableLines) {
            var lineNumber = parseInt(editableLines[i], 10);
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

        this.editor.on("beforeChange", function(editor, changes) {
            if (changes.origin === "setValue") return;

            var start = changes.from.line;
            var end = changes.to.line;

            for ( var i = start; i <= end; i++ ) {
                if (editableLines.indexOf(i.toString()) === -1) {
                    changes.cancel();
                    return;
                }
            }
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