var PhantomDancer = function(top, left, timeBetweenSteps) {
  //var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this.fade = false;
};

PhantomDancer.prototype = Object.create(Dancer.prototype);
//BlinkyDancer.prototype.constructor = BlinkyDancer;

PhantomDancer.prototype.step = function() {
  Dancer.prototype.step.apply(this);
  //console.log(this);
  if (!this.stopAnimation) {
    PhantomEffect(this.$node, this.timeBetweenSteps);
  }
};

var PhantomEffect = function(dancer, timeBetweenSteps) {
  if (!dancer.fade) {
    dancer.fadeIn(timeBetweenSteps);
    dancer.fade = true;
  } else {
    dancer.fadeOut(timeBetweenSteps);
    dancer.fade = false;
  }
};
