$(document).ready(function() {
  window.dancers = [];
  var duelDancers = [];

  $('.lineUpButton').on('click', function(event){
    var totalDancer = dancers.length;
    lineUpFunction(dancers, 0);
    $('.rotating').removeClass("rotating");
  });

  $('.switchButton').on('click', function(event){
    var totalDancer = dancers.length;
    lineUpFunction(dancers, 1);
  });

  $('body').delegate("img", "click", function() {
    console.log("this: " + this);
    $(this).removeClass("rotating");
    $(this).addClass("rotating");
    $(this).addClass("resize");
  });

  var lineUpFunction = function(dancers, option) {
    dancers.forEach(function(dancer, i){
      
      if (i % 2 === option) {
        var styleSettings = {
          transition: 'all 0.5s ease',
          left: '5%'
        };
      } else {
        var styleSettings = {
          transition: 'all 0.5s ease',
          left: '95%'
        };
      }
      dancer.$node.css(styleSettings);
    });
  };

  $('.rotateButton').on('click', function(event) {
    dancers.forEach(function(dancer, i ) {
      var rotateSettings = {
        '-webkit-animation': 'rotate 20s infinite linear',
        '-moz-animation': 'rotate 20s infinite linear',
        '-ms-animation': 'rotate 20s infinite linear',
        '-o-animation': 'rotate 20s infinite linear',
        'animation': 'rotate 20s infinite linear' 
      };
      dancer.$node.css(rotateSettings);
    });
  });

  $('body').delegate("img", "mouseover", function() {
    $(this).attr('src', './src/image/papermario.gif');
  });

  $('body').delegate("img", "mouseleave", function() {
    $(this).attr('src', './src/image/michael_jackson.gif');
  });

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    
    dancers.push(dancer);

    $('body').append(dancer.$node);
  });
});

