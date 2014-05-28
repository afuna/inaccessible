jQuery(function($) {
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

    $("#canvas")
        .on("mouseover", "input", runAway)
        .on("change", "input", function(e) {

        })
})
