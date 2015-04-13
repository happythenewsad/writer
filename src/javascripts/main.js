var $ = require('jquery');
window.$ = $;

$(document).ready(function(){

  var $manuscript = $("textarea.manuscript");
  $manuscript.focus();

  $manuscript.keyup(function(event) {
    if (event.which !== 32 && event.which !== 13){
      return;
    }

    var text = $manuscript.val();
    var cleanText = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    var charCount = cleanText.length;
    var wordArray = cleanText.split(" ");
    var wordCount = wordArray.length;

    $("#wordcount").text(wordCount.toString());
  });

  //for counting purposes, substitute carraige return with whitespace
  //collapse all contiguous CRs and whitespace into one whitespace

});
