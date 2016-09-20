$(document).ready(function() {
  window.dancers = [];
  var duelDancers = [];
  var formationsList = ["leftDiagonal","rightDiagonal"];
  var formationCounter = 0;

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
    var $that = $(this);
    lineUpFunction(dancers, 0, function() {
      $that.removeClass("rotating");
      $that.addClass("rotating");
      $that.addClass("resize");
    });

  });

  $('.randomizeButton').click(function() {
    
    $('.rotating').removeClass('resize');
    $('.rotating').removeClass('rotating');

    dancers.forEach(function(dancer, i) {
      var styleSettings = {
        top: heightChecker($("body").height() * Math.random()),
        left: $("body").width() * Math.random()
      };

      dancer.$node.css(styleSettings);
    });
  });

  $('.populateButton').click(function() {
    var populationValue = $(".populationValue").val() || 10;
    var dancerType = ['BlinkyDancer','BounceDancer','PhantomDancer'];

    for (var i = 0; i < populationValue; i++) {
      var rand = Math.floor(Math.random() * dancerType.length);
      var dancerName = dancerType[rand];
      var functionName = window[dancerName];

      var dancer = new functionName(
        heightChecker($("body").height() * Math.random()),
        $("body").width() * Math.random(),
        Math.random() * 1000
      );

      dancers.push(dancer);
      $('body').append(dancer.$node);
    }
  });

  $('.formationButton').click(function() {
    $('.rotating').removeClass('resize');
    $('.rotating').removeClass('rotating');

    var numDancers = dancers.length;
    var heightChange = ($("body").height() - 32) / numDancers;
    var widthChange = $("body").width() / numDancers;
    if ("leftDiagonal" === formationsList[formationCounter]) {
      var leftValue = 0;
      var topValue = 33;
    } else if ("rightDiagonal" === formationsList[formationCounter]) {
      var leftValue = 0;
      var topValue = $("body").height();
    } else if ("diamond" === formationsList[formationCounter]) {
      var q1 = [0, ($("body").height()/2)];
      var q2 = [($("body").width()/2), 0];
      var q3 = [0, ($("body").height()/2)];
      var q4 = [($("body").width()/2), ($("body").height())];

      var heightChange = ($("body").height() / 2) / (numDancers / 4);
      var widthChange = ($("body").width() / 2) / (numDancers / 4);

      var leftValue = q1[0];
      var topValue = q[1];
    }
    dancers.forEach(function(dancer, i) {
      var styleSettings = {
        transition: 'all 0.5s ease',
        left: leftValue,
        top: topValue
      };

      if ("leftDiagonal" === formationsList[formationCounter]) {
        leftValue += widthChange;
        topValue += heightChange;
      } else if ("rightDiagonal" === formationsList[formationCounter]) {
        leftValue += widthChange;
        topValue -= heightChange;
      } else if ("diamond" === formationsList[formationCounter]) {
        var modCalculation = (i % 4);
        if (modCalculation === 0) {
          q1[0] += widthChange;
          q1[1] += heightChange;
          leftValue += q1[0];
          topValue -= q1[1];
        } else if (modCalculation === 1) {
          q2[0] += widthChange;
          q2[1] += heightChange;
          leftValue += q2[0];
          topValue += q2[1];
        } else if (modCalculation === 2) {
          q3[0] += widthChange;
          q3[1] += heightChange;
          leftValue += q3[0];
          topValue -= q3[1];
        } else if (modCalculation === 3) {
          q4[0] += widthChange;
          q4[1] += heightChange;
          leftValue += q4[0];
          topValue += q4[1];
        }

        var styleSettings = {
          transition: 'all 0.5s ease',
          left: leftValue,
          top: topValue
        };
      }


      dancer.$node.css(styleSettings);
    });

    formationCounter++;

    if (formationCounter >= formationsList.length){
      formationCounter = 0;
    }
  });

  var lineUpFunction = function(dancers, option, cb) {
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
    cb();
  };

  $('body').delegate("img", "mouseover", function() {
    var audio = new Audio('./src/Audio/ItsMeMario.mp3');
    audio.play();
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
      heightChecker($("body").height() * Math.random()),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    dancers.push(dancer);

    $('body').append(dancer.$node);
  });
});

var heightChecker = function(height) {
  var correctHeight;
  if (height <= 32) {
    correctHeight = 33;
  } else {
    correctHeight = height;
  }

  return correctHeight;
};