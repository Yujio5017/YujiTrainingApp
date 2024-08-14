const TOTAL_TIMER = 1500; // 25 minutes in seconds (1500)
const INITIAL_SET= 1;  // Starts at Set 1
const BREAK_TIMER = 300; // 5 minutes in seconds (300)

let timer;
let timeLeft = TOTAL_TIMER; 
let set= INITIAL_SET;
let breaktimeleft = BREAK_TIMER;

const totalTime = timeLeft;
const totalBreakTime = breaktimeleft;

// Get the audio element
var audio = document.getElementById('myAudio');
const progressBar = document.getElementById('progressCircle');
const backgroundBar = document.getElementById('backgroundCircle');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const setTitle = document.getElementById('setTitle');
const playPauseIcon = document.getElementById('playPauseIcon');

// Initialize the progress circle
progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');

let isPlaying = false; // Initial state: not playing
let timerInterval; // Variable to hold the timer interval

resetTimerHeader();

// Toggle play/pause functionality
function togglePlayPause() {
  if (isPlaying) {
    // Pause action
    console.log('Pausing...');
    playPauseIcon.src = './database/play.svg'; // Change to play icon
    clearInterval(timerInterval); // Stop the timer interval
  } else {
    // Play action
    console.log('Playing...');
    playPauseIcon.src = './database/pause.svg'; // Change to pause icon
    startTimer(); // Start the timer
  }
  isPlaying = !isPlaying; // Toggle state
}

// Start the timer
function startTimer() {
  console.log('Timer started!');
  timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000 ms)
  setCounter=set;
}

function updateTimer() {
  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.querySelector('h1').textContent = timerDisplay;
  let progress = setCounter == 1 || setCounter % 2 != 0 ? ((totalTime - timeLeft) / totalTime) * 100 : ((totalBreakTime- timeLeft) / totalBreakTime) * 100; 


  const dashOffset = progressBar.getTotalLength() - (progress / 100) * progressBar.getTotalLength();
  
  // Smoothly transition the stroke dash offset
  progressBar.style.strokeDashoffset = dashOffset;

  // Check if progress is 100% (or more, if there's overshoot)
  if (progress >= 100) {
    // Change stroke color to green
    progressBar.classList.add('green');
  } else {
    // Remove green class if progress is less than 100%
    progressBar.classList.remove('green');
  }


  if (timeLeft <= 0) {
    // Reset Timer and Header and Circle
    clearInterval(timerInterval);
    setCounter += 1;

    resetTimerHeader();
    progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');
    if (setCounter == 1 || setCounter % 2 != 0) {
      backgroundBar.setAttribute('stroke', '#F15822');
      const displaySet = setCounter == 1 ? setCounter : setCounter - 1;
      setTitle.textContent = `Set ${displaySet}`;
      timeLeft = totalTime;
    } else {
      backgroundBar.setAttribute('stroke', 'orange');
      setTitle.textContent = "BREAK";
      timeLeft = totalBreakTime;
    }

    timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000 ms)

    // Play Dings
    playAudio();
  }
}

// Function to play the audio
function playAudio() {
  audio.play();
}
// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = totalTime;
  setCounter=set;
  setTitle.textContent=`Set ${set.toString()}`;
  resetTimerHeader();
  progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');
  playPauseIcon.src = './database/play.svg'; // Reset to play icon
  isPlaying = false; // Reset play/pause state
}


// Reset the timer h1
function resetTimerHeader() {
  let resetVariable = setCounter == 1 || setCounter % 2 != 0 ? totalTime : totalBreakTime;
  const minutesReset = Math.floor(resetVariable / 60);
  const secondsReset = resetVariable % 60;
  const timerDisplayReset = `${minutesReset.toString().padStart(2, '0')}:${secondsReset.toString().padStart(2, '0')}`;
  document.querySelector('h1').textContent = timerDisplayReset;
  setTitle.textContent = `Set ${set}`;
  backgroundBar.setAttribute('stroke', '#F15822');

}


// Skip the Timer
function skipTimer(){
  timeLeft=0;
}


// Event listener for start/pause button
document.getElementById('playPauseButton').addEventListener('click', togglePlayPause);

// Event listener for reset button
resetButton.addEventListener('click', resetTimer);

// Optionally, you can also trigger startTimer() directly from the start button
startButton.addEventListener('click', startTimer);
