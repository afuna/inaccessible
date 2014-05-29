var levelData = {
    title: "The Beginning",
    flavorText: "Greetings, adventurer. Welcome to the tower. Remember you have the power to change the world around you. Now try to get out.",
    code: "// good luck",
    onLevelStart: function(game) {
        $(game.puzzlePane).append("<button class='begin main-focus'>Begin</button>");
        $(".begin").click(function() {
            $(game.puzzlePane).trigger("levelwin");
        });
    },
};