var BounceDancer = function(top, left, timeBetweenSteps) {
  //var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this.bounce = false;
};

BounceDancer.prototype = Object.create(Dancer.prototype);
//BlinkyDancer.prototype.constructor = BlinkyDancer;

BounceDancer.prototype.step = function() {
  Dancer.prototype.step.apply(this);
  //console.log(this);
  bounce(this.$node);
};

var bounce = function(dancer) {
  if (!dancer.bounce) {
    dancer.removeClass('bounceDown');
    dancer.addClass('bounceUp');
    dancer.bounce = true;
  }
  else {
    dancer.removeClass('bounceUp');
    dancer.addClass('bounceDown');
    dancer.bounce = false;
  }
};
