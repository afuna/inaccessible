var levelData = {
    title: "It's All a Blur",
    flavorText: "You have a page in your hand. Unfortunately, no matter how much you squint at it, the letters all just blur together.",
    code: ".map {\n\
!   font-size: 10px;\n\
    color: #222;\n\
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 1), 0px 0px 3px rgba(0, 0, 0, 1), 0px 0px 3px rgba(0, 0, 0, 1), 0px 0px 3px rgba(0, 0, 0, 1);\n\
}\n\
.map a { color: #000; }",
    codeType: "css",
    onLevelStart: function(game) {
        game.updatePuzzlePane("<div class='map'>Greetings and salutations. I would like to have a lot of text here today but for now let's just say that this is enough. <a href='#nextlevel'>Go to the next level</a> if you want, if you can find the path there. This is a bit do-as-I-say-not-as-I-do -- I really don't recommend trying to hide your links the way I have here. You should <a href='#firstlink'>click on this link first</a></div>")
    }
};