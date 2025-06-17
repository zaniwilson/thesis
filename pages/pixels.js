console.log("Hello World");

setTimeout(function () {
  window.location = 'videotwo.html';
}, 30000);

var capture;
let bodyPose;
let poses = [];
let distance = 0;

function preload() {

  let div = document.getElementById("p5_loading");
  div.innerHTML = "are you watching closely?";


  bodyPose = ml5.bodyPose("MoveNet")
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  //stepSize_slider = createSlider(8, 48,12,1);
  capture.hide();
  frameRate(24);
  rectMode(CENTER);
  bodyPose.detectStart(capture, gotPoses);
}

function draw() {
  background(0);
  capture.loadPixels();

  let windowSize = min(windowWidth, windowHeight);
  //   console.log(windowSize);

  if (poses.length > 0) {
    let pose = poses[0]
    lx = pose.left_eye.x;
    ly = pose.left_eye.y;
    rx = pose.right_eye.x;
    ry = pose.right_eye.y;

    line(lx, ly, rx, ry)

    let d = dist(lx, ly, rx, ry);
    distance = lerp(distance, d, 0.1);
    // console.log(d);

    // you can change the stepSize
    //var stepSize = stepSize_slider.value();
    let maxStep = windowSize / 3.645;
    var stepSize = floor(map(distance, 0, width, 5, maxStep, true));
    for (var x = 0; x < capture.width; x += stepSize) {
      for (var y = 0; y < capture.height; y += stepSize) {
        var index = ((y * capture.width) + x) * 4;
        // The code for your filter will go here!
        var redVal = capture.pixels[index];
        var greenVal = capture.pixels[index + 1];
        var blueVal = capture.pixels[index + 2];

        noStroke();
        // you can change the colors

        // fill(2*redVal, greenVal, blueVal/2);
        let closeness = constrain(map(distance, 0, width, 0, 1), 0, 1);
        // console.log(closeness);

        let r = lerp(redVal, redVal * 5, closeness);
        let g = lerp(greenVal, greenVal * 0.5, closeness);
        let b = lerp(blueVal, blueVal * 0.2, closeness);

        fill(r, g, b);

        // you can change the shape of the 'pixels'
        rect(x, y, stepSize, stepSize);
        //circle(x, y, stepSize, stepSize);

      }
    }
  }

}
