let buttonid = ["green", "red", "yellow", "blue"], newGame = 0, keySequence = [], level = 1, userClicks = [], i = 0;
let buttonPress = (idx) => {
    $("#" + buttonid[idx]).addClass("pressed");
    setTimeout(() => {
        $("#" + buttonid[idx]).removeClass("pressed");
    }, 100);
}
let growPattern = () => {
    const idx = Math.floor(4 * Math.random());
    keySequence.push(buttonid[idx]);
    buttonPress(idx);
}
buttonid.forEach((ele) => $("#" + ele).click(() => {
    const sound = new Audio("sounds/" + ele + ".mp3");
    sound.play();
    userClicks.push(ele);
    if (userClicks[i] != keySequence[i]) {
        newGame = 0; //game over
        const gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        $("#level-title").text("Game Over, Press any key to restart");
    } else {
        i++;
    }
    if (i == level) {
        i = 0; //goto next level
        userClicks = [];
        level++;
        $("#level-title").text("Level " + level);
        growPattern();
    }
}));
$(document).on("keydown", () => {
    if (newGame == 0) {
        keySequence = [], level = 1, userClicks = [], i = 0, newGame = 1;
        $("#level-title").text("Level 1");
        growPattern();
    }
});