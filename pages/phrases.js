setTimeout(function () {
    window.location = '../index.html';
}, 30000);


let phrases = ["IT'S THAT DAMN PHONE", "STAY WOKE", "CHRONICALLY ONLINE", "TIMELINE CLEANSE", "WATCH THIS", "CHRONICALLY ONLINE", "SILENCE IS VIOLENCE", "PAY ATTENTION", "PAY ATTENTION", "LOOK AWAY", "GO TO BED", "WAKE UP", "ADDICT", "DIGITAL DETOX", "TOUCH GRASS", "LOOK", "RUN DON'T WALK", "BREAKING NEWS", "TAKE A BREAK", "ONE MORE VIDEO"];
let texts = [];

let video;
let videoReady = false;

let redAlpha = 0;
let increasing = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    initializeTexts();

    video = createCapture(VIDEO, () => {
        videoReady = true;
    });
    video.size(windowWidth, windowHeight);
    video.hide();

    background(0); // Set to black initially
}

function draw() {

    if (videoReady) {
        image(video, 0, 0, windowWidth, windowHeight);

        fill(255, 255, 255, 50);
        rect(0, 0, windowWidth, windowHeight);

        if (increasing) {
            redAlpha += 0.5;
            if (redAlpha >= 150) {
                increasing = false;
            }
        } else {
            redAlpha -= 0.5;
            if (redAlpha <= 0) increasing = true;
        }

        // Red tint overlay
        fill(255, 0, 0, redAlpha);
        rect(0, 0, width, height);

        for (let t of texts) {
            if (!t.active && frameCount > t.delayFrames) {
                t.active = true;
            }

            if (t.active && t.opacity > 0) {
                fill(0, 0, 0, t.opacity);
                textSize(t.size);
                drawGlitchText(t.phrase, t.x, t.y, t.size, t.opacity);

                t.size += 0.25;
                t.opacity -= 2;
            }

            if (t.opacity <= 0 && t.active) {
                resetText(t); // Loop this phrase again
            }
        }
    }

}

function initializeTexts() {
    for (let i = 0; i < phrases.length; i++) {
        texts.push(createTextObject(phrases[i]));
    }
}

function createTextObject(phrase) {
    let x, y;
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 500) {
        x = random(100, width - 100);
        y = random(100, height - 100);
        let overlaps = false;

        for (let t of texts) {
            let d = dist(x, y, t.x, t.y);
            if (t.opacity > 10 && d < 100) {
                overlaps = true;
                break;
            }
        }

        if (!overlaps) placed = true;
        attempts++;
    }

    return {
        phrase: phrase,
        x: x,
        y: y,
        size: 15,
        opacity: 150,
        delayFrames: frameCount + int(random(30, 300)), // delayed start
        active: false
    };
}

function resetText(t) {
    // Reuse the object with a new position and delay
    let newText = createTextObject(t.phrase);
    t.x = newText.x;
    t.y = newText.y;
    t.size = 15;
    t.opacity = 150;
    t.delayFrames = frameCount + int(random(30, 300));
    t.active = false;
}

function drawGlitchText(txt, x, y, size, opacity) {
    textSize(size);

    // Base text (white or black)
    fill(0, 0, 0, opacity);
    text(txt, x, y);

    // Blue glitch
    fill(0, 0, 255, opacity * 0.7);
    text(txt, x + random(-2, 2), y + random(-1, 1));

    // Green glitch
    fill(0, 255, 0, opacity * 0.7);
    text(txt, x + random(-2, 2), y + random(-1, 1));

    // Red glitch
    fill(255, 0, 0, opacity * 0.7);
    text(txt, x + random(-2, 2), y + random(-1, 1));
}