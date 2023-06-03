// stopwatch.js specific code
let minutes = 0;
let seconds = 0;
let countdownInterval;
let isCountdownRunning = false;

function toggleCountdown() {
  if (isCountdownRunning) {
    pauseCountdown();
  } else {
    startCountdown();
  }
}

function startCountdown() {
  if (!isCountdownRunning) {
    const minutesInput = document.getElementById("minutesInput");
    minutes = parseInt(minutesInput.value, 10);
    seconds = 0;
    countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    isCountdownRunning = true;
    document.getElementById("startBtn").innerHTML =
      '<i class="fa fa-pause"></i>';
  }
}

function pauseCountdown() {
  if (isCountdownRunning) {
    clearInterval(countdownInterval);
    isCountdownRunning = false;
    document.getElementById("startBtn").innerHTML =
      '<i class="fa fa-play"></i>';
  }
}

function resetCountdown() {
  clearInterval(countdownInterval);
  minutes = 0;
  seconds = 0;
  isCountdownRunning = false;
  document.getElementById("startBtn").innerHTML = '<i class="fa fa-play"></i>';
  updateCountdown();
}

function updateCountdown() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(countdownInterval);
      isCountdownRunning = false;
      document.getElementById("startBtn").innerHTML =
        '<i class="fa fa-play"></i>';
      playAlertSound();
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  const display = document.getElementById("display");
  display.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Attach event listeners to buttons
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", toggleCountdown);
stopBtn.addEventListener("click", pauseCountdown);
resetBtn.addEventListener("click", resetCountdown);

// Function to fetch a random image URL from the Unsplash API
function getRandomImage() {
  const accessKey = "cFTmpdhBd990LtCbFxAIZjLlWml5tauS8_TNaAKGzms";
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.urls.regular;
      const backgroundContainer = document.querySelector(
        ".background-container"
      );
      const backgroundImage = document.querySelector(".background-image");

      // Fade out the current image
      backgroundImage.style.opacity = 0;

      // Set the new image after a brief delay
      setTimeout(() => {
        backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
        backgroundImage.style.opacity = 1;
      }, 500);
    })
    .catch((error) => {
      console.error("Error fetching random image:", error);
    });
}

// Function to fetch a random quote
function getRandomQuote() {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex].text;
      const author = data[randomIndex].author || "Unknown";

      // Update the HTML element with the quote
      const quoteElement = document.getElementById("quote");
      quoteElement.textContent = `"${quote}" - ${author}`;
    })
    .catch((error) => {
      console.error("Error fetching random quote:", error);
    });
}

// Call the function to fetch a random quote on page load
getRandomQuote();

// Call the function to set the initial random image on page load
getRandomImage();
