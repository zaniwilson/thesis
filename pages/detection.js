// console.log('hello world')

// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;

setTimeout(function () {
    window.location = 'videothree.html';
}, 30000);


let video;
let detector;
let detections = [];

function preload() {
    let div = document.getElementById("p5_loading");
    div.innerHTML = "where's your phone?";

    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
    if (error) {
        console.error(error);
    }
    detections = results;
    // console.log(results);
    detector.detect(video, gotDetections);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();
    // Set the video to maintain aspect ratio
    video.style('object-fit', 'cover');
    detector.detect(video, gotDetections);
}


function draw() {
    image(video, 0, 0, width, height);

    for (let i = 0; i < detections.length; i++) {
        let object = detections[i];

        if (object.label == 'person' && object.confidence > 0.1) {
            stroke(0, 255, 0);
            strokeWeight(4);
            noFill();
            rect(object.x, object.y, object.width, object.height);
            noStroke();
            fill(255);
            textSize(24);
            text("human", object.x + 10, object.y + 24);
        } if (object.label == 'cell phone' && object.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(4);
            noFill();
            rect(object.x, object.y, object.width, object.height);
            noStroke();
            fill(255);
            textSize(24);
            text(object.label, object.x + 10, object.y + 24);
        }
    }
}