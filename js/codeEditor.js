function CodeEditor(textareaId, game) {
    var editableLines = [];

    function preprocess(code) {
        var lines = code.split("\n");
        var modifiedCode = [];
        editableLines = [];
        for (var i in lines) {
            var line = lines[i];
            if (line.indexOf("!") == 0) {
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

    function unhighlightLines(editor) {
        for (var i in editableLines) {
            var lineNumber = parseInt(editableLines[i], 10);
            editor.removeLineClass(lineNumber, 'wrap', 'editable');
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
    };

    this.onChange = function(callback) {
        this.editor.on("changes", callback);
    };

    var updateHTML = function(editor) {
        game.updatePuzzlePane(editor.getValue());
    };

    var updateCSS = function(editor) {
        game.updatePuzzlePaneStyle(editor.getValue());
    };

    this.setCodeType = function(codeType) {
        this.editor.off("changes", updateHTML);
        this.editor.off("changes", updateCSS);

        if (codeType === "html") {
            this.editor.on("changes", updateHTML);
        } else if (codeType === "css") {
            this.editor.on("changes", updateCSS);
        }
    };

    this.loadCode = function(code) {
        this.editor.setValue(preprocess(code));
        highlightLines(this.editor);
    };

    this.unloadCode = function() {
        this.editor.setValue("");
        unhighlightLines(this.editor);
    };

    this.initialize();
};