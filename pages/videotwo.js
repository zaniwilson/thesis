console.log("Hello World");

setTimeout(function () {
  window.location = 'detection.html';
}, 120000);

// List your video files
const videoFiles = [
  "../media/bisanhospital.mp4",
  "../media/reporter.mp4",
  "../media/girlcrying.mp4",
  "../media/protestpalestine.mp4",
  "../media/bayt.mp4",
  "../media/airindia.mp4",
  "../media/kiss.mp4"
];

// Shuffle the array (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(videoFiles);

let currentIndex = 0;
const videoElement = document.getElementById('myVideo');

// Function to play the next video
function playNextVideo() {
  if (currentIndex < videoFiles.length) {
    videoElement.src = videoFiles[currentIndex];
    videoElement.play();
    currentIndex++;
  } else {
    // Optionally, reshuffle and start over
    shuffle(videoFiles);
    currentIndex = 0;
    playNextVideo();
  }
}

// When the video ends, play the next one
videoElement.addEventListener('ended', playNextVideo);

// Start the first video
playNextVideo();

// Optional: Unmute on click
videoElement.addEventListener('click', function () {
  this.muted = false;
  this.play();
});

document.getElementById('test.mp4').addEventListener('click', function () {
  this.muted = false;
  this.play(); // Ensures playback resumes if needed
});
