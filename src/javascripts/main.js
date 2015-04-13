var $ = require('jquery');
window.$ = $; //for debugging only

var Manuscript = require("./manuscript");

var SPACE_KEY = 32;
var RETURN_KEY = 13;
var BACKSPACE_KEY = 8;
var SEMICOLON_KEY = 59;
var QUOTE_KEY = 222;
var PERIOD_KEY = 190;
var SHIFT_KEY = 16;

var text;
var cleanText;
var charCount;
var wordArray;
var wordCount;


function supports_html5_storage() {
  try {
    return "localStorage" in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
}

$(document).ready(function(){
  var $manuscript = $("textarea.manuscript");
  var $legend = $(".legend");
  var $goalField = $legend.find("#goal-field");
  var $goalTarget = $legend.find("#goal-countdown .target");
  var $wordCount = $("#wordcount");

  $manuscript.focus();

  var manuscript = new Manuscript();
  manuscript.initialize({
    html5storage: supports_html5_storage()
  });
  
  updateUI();

  function updateWordsUntilGoalColors(elem, percentGoalAchieved) {
    $goalTarget.removeClass("first-quintile second-quintile third-quintile fourth-quintile fifth-quintile accomplished");
    
    if (percentGoalAchieved < 0.2 ) {
      $goalTarget.addClass("first-quintile");
    }
    else if (percentGoalAchieved < 0.4) {
      $goalTarget.addClass("second-quintile");
    }
    else if (percentGoalAchieved < 0.6) {
      $goalTarget.addClass("third-quintile");
    }
    else if (percentGoalAchieved < 0.8) {
      $goalTarget.addClass("fourth-quintile");
    }
    else if (percentGoalAchieved < 1) {
      $goalTarget.addClass("fifth-quintile");
    }
    else {
      $goalTarget.addClass("accomplished");
    }
  }

  //updates data display and updates local storage
  function updateUI(){
    $wordCount.text(manuscript.wordcount());
    $goalTarget.text(manuscript.wordsUntilGoal());
    $goalField.val(manuscript.goal());
    $manuscript.text(manuscript.manuscript);
    updateWordsUntilGoalColors($goalField, manuscript.wordcount() / manuscript.goal());

    if (manuscript.wordcount() === manuscript.goal()){
      goalCompletedAnimation($manuscript);
    }

  }

  function goalCompletedAnimation(element){
    element.addClass("goal-accomplished");
    setTimeout(function(){
      element.removeClass("goal-accomplished");
    }, 400);
  }

  $goalField.on("blur", function(){
    manuscript.setData("goal", $goalField.val());
    updateUI();
  });


  $goalField.keyup(function(event) {
    if (event.which === 13) {
      $goalField.blur();
    }
  });

  function isEmptyString(str){
    return str.length === 0;
  }

  $manuscript.keyup(function(event) {
    // don't sync data and UI on every keystroke
    if (event.which !== SPACE_KEY && 
      event.which !== RETURN_KEY &&
      event.which !== SHIFT_KEY &&
      event.which !== SEMICOLON_KEY &&
      event.which !== QUOTE_KEY &&
      event.which !== BACKSPACE_KEY &&
      event.which !== PERIOD_KEY ){
      return;
    }

    text = $manuscript.val();
    cleanText = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    charCount = cleanText.length;
    wordArray = cleanText.split(" ");

    wordCount = isEmptyString(cleanText) ? 0 : wordArray.length;

    manuscript.setData("wordcount", wordCount);
    manuscript.setData("manuscript", text);

    updateUI();
  });


});
