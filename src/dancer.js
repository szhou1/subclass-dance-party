// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {

  this.timeBetweenSteps = timeBetweenSteps;
  // use jQuery to create an HTML <span> tag
  this.shapes = ['square', 'circle', 'triangle'];
  var rand = Math.floor(Math.random() * this.shapes.length);
  this.$node = $('<image class="dancer dancer-image" src="./src/image/michael_jackson.gif">');

  this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

  this.setColor(this.shapes[rand]);
};

Dancer.prototype.step = function() {
  var context = this;
  setTimeout(function() {
    context.step();
  }, context.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.setColor = function(shape) {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }

  var colorSettings;
  // if (shape === 'triangle') {
  //   colorSettings = {'border-top': '20px solid ' + color};
  // } else {
  //   colorSettings = {border: '10px solid ' + color};
  // }
  colorSettings = {border: '3px solid ' + color};
  this.$node.css(colorSettings);
};