var levelData = {
    title: "The Runaway Keyhole",
    flavorText: "You see a chest in front of you. If you could somehow activate the checkbox, you could open it. But it keeps trying to run away.",
    code: "<div class=\"chest main-focus\">\n\
    <form class=\"keyhole\">\n\
        <input type=\"checkbox\" name=\"canttouchme\" id=\"canttouchme\">\n\
!       <label>keyhole</label>\n\
    </form>\n\
</div>",
    onLevelStart: function(game) {
        function getRandomVector(min, max) {
            var signRandom = Math.random()
            var sign = (signRandom > 0.5) ? 1 : -1;
            return sign * (Math.floor(Math.random() * (max - min + 1)) + min);
        }

        function runAway() {
            var x = getRandomVector(20, 40);
            var y = getRandomVector(20, 40);

            var delta = { left: "+=" + x, top: "+=" + y};
            $(this).animate(delta, 200);
        }

        $(game.puzzlePane).on("mouseover", "#canttouchme", runAway);

        // now we register the win condition
        $(game.puzzlePane).on("change", "#canttouchme", function() {
            $(game.puzzlePane).trigger("levelwin");
        });
    },
};