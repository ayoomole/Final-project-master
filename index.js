

// Function to fetch a random image URL from the Unsplash API
function getRandomImage() {
  // Replace 'YOUR_UNSPLASH_ACCESS_KEY' with your actual Unsplash API access key
  const accessKey = '5VD8KmEYmt68-vtAQgmNt2_OpF1rteFSCbW2qAu04xk';
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
  fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const imageUrl = data.urls.regular;
          const backgroundContainer = document.querySelector('.background-container');
          const backgroundImage = document.querySelector('.background-image');
  
          // Fade out the current image
          backgroundImage.style.opacity = 0;
  
          // Set the new image after a brief delay
          setTimeout(() => {
            backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
            backgroundImage.style.opacity = 1;
          }, 500);
        })
        .catch(error => {
          console.error('Error fetching random image:', error);
        });
    }

// Function to fetch a random quote
function getRandomQuote() {
  fetch('https://favqs.com/api/qotd')
    .then(response => response.json())
    .then(data => {
      const quote = data.quote.body;
      document.getElementById('quote').textContent = quote;
    })
    .catch(error => {
      console.error('Error fetching random quote:', error);
    });
}

// Timer functionality
let timer;
let minutes = 25;
let seconds = 0;
let isTimerRunning = false;
let isBreakTimer = false;

function toggleTimer() {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  isTimerRunning = true;
  document.getElementById('toggleBtn').innerHTML = '<i class="fa fa-pause"></i>';
}

function pauseTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  document.getElementById('toggleBtn').innerHTML = '<i class="fa fa-play"></i>';
}

function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  if (isBreakTimer) {
    minutes = 10;
    document.getElementById('switchBtn').textContent = 'Switch to 25 min';
  } else {
    minutes = 25;
    document.getElementById('switchBtn').textContent = 'Switch to 10 min';
  }
  seconds = 0;
  document.getElementById('toggleBtn').innerHTML = '<i class="fa fa-play"></i>';
  updateTimer();
}

function switchTimer() {
  if (isBreakTimer) {
    minutes = 25;
    document.getElementById('switchBtn').textContent = 'Switch to 10 min';
  } else {
    minutes = 10;
    document.getElementById('switchBtn').textContent = 'Switch to 25 min';
  }
  seconds = 0;
  isBreakTimer = !isBreakTimer;
  getRandomQuote();
  updateTimer();
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      isTimerRunning = false;
      document.getElementById('toggleBtn').innerHTML = '<i class="fa fa-play"></i>';
      playAlertSound();
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function playAlertSound() {
  const alertSound = document.getElementById('alertSound');
  alertSound.play();
}

// Attach event listeners to buttons
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const switchBtn = document.getElementById('switchBtn');

toggleBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
switchBtn.addEventListener('click', switchTimer);

// Quote function
function getRandomQuote() {
  fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex].text;
      const author = data[randomIndex].author || 'Unknown';

      // Update the HTML element with the quote
      const quoteElement = document.getElementById('quote');
      quoteElement.textContent = `"${quote}" - ${author}`;
    })
    .catch(error => {
      console.error('Error fetching random quote:', error);
    });
}

// Call the function to fetch a random quote on page load
getRandomQuote();

// Call the function to set the initial random image and quote on page load
getRandomImage();
