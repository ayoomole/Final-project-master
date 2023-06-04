// Stopwatch Functionality
let minutes = 0;
let seconds = 0;
let countdownInterval;
let isCountdownRunning = false;

//Start & Pause Funtcionality
function toggleCountdown() {
  if (isCountdownRunning) {
    pauseCountdown();
  } else {
    startCountdown();
  }
}

// Starting the coundown on request
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

// Pausing the countdown on request
function pauseCountdown() {
  if (isCountdownRunning) {
    clearInterval(countdownInterval);
    isCountdownRunning = false;
    document.getElementById("startBtn").innerHTML =
      '<i class="fa fa-play"></i>';
  }
}

//Resetting the countdown on request
function resetCountdown() {
  clearInterval(countdownInterval);
  minutes = 0;
  seconds = 0;
  isCountdownRunning = false;
  document.getElementById("startBtn").innerHTML = '<i class="fa fa-play"></i>';
  updateCountdown();
}

//Getting the countdown to update every second
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

// Connecting the buttons to the functions
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", toggleCountdown);
stopBtn.addEventListener("click", pauseCountdown);
resetBtn.addEventListener("click", resetCountdown);
