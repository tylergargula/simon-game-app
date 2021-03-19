buttonColours = ["red", "blue", "green", "yellow"];


gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {

  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }

});





$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});





//Sequence Function

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);



  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

//Sound Function


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Animation Function

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");

  }, 100);

};



//Check User Answer Against game

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");


  if (gamePattern.length == userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();

    }, 1000);

}

  } else {

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);

  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("h1").text("Game Over, Press Any Key to Restart");

  startOver();


  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
