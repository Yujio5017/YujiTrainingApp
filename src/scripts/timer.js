const TOTAL_TIMER = 1500; // 25 minutes in seconds (1500)
const INITIAL_SET= 1;  // Starts at Set 1
const BREAK_TIMER = 300; // 5 minutes in seconds (300)

let startTime = Date.now();
let timeLeft = TOTAL_TIMER; 
let set= INITIAL_SET;
let breaktimeleft = BREAK_TIMER;
let totalBothTime =  TOTAL_TIMER + BREAK_TIMER;


let setCounter = set;
const totalTime = timeLeft;
const totalBreakTime = breaktimeleft;
const totalAllTime = totalBothTime;

// Get the audio element
var audio = document.getElementById('myAudio');
const progressBar = document.getElementById('progressCircle');
const backgroundBar = document.getElementById('backgroundCircle');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const setTitle = document.getElementById('setTitle');
const setActivityNumber = document.getElementById('activity-number');
const setEncouragement = document.getElementById('encouragement');
const playPauseIcon = document.getElementById('playPauseIcon');
const encouragementList= ["You've got this!", "Believe in yourself.", "Stay strong, stay focused.", "Keep pushing forward.", "You're doing great!", "Don't give up.", "Every step counts.", "Stay positive, stay motivated.", "You're almost there!", "Keep shining!"]
let randomIndex = Math.floor(Math.random() * encouragementList.length);
// Initialize the progress circle
progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');

let isPlaying = false; // Initial state: not playing
let timerInterval; // Variable to hold the timer interval
let started = false;

class TimestampSingleton {
  static instance;
  static timestamp;

  constructor() {
    if (!TimestampSingleton.instance) {
      TimestampSingleton.instance = this;
      TimestampSingleton.timestamp = Date.now();
    }
    return TimestampSingleton.instance;
  }
  static getInstance() {
    if (!TimestampSingleton.instance) {
      TimestampSingleton.instance = new TimestampSingleton();
    }
    return TimestampSingleton.instance;
  }
  getTimestamp() {
    return TimestampSingleton.timestamp;
  }

  updateTimestamp() {
    TimestampSingleton.timestamp = Date.now();
  }
}

// Usage:
const singleton = new TimestampSingleton();



// let lastMinute = new Date().getMinutes();

// setInterval(() => {
//   const currentMinute = new Date().getMinutes();
//   if (currentMinute !== lastMinute) {
//     lastMinute = currentMinute;
//     updateActivityList();
//   }
// }, 1000); // check every second


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
  if (started == false) {
    singleton.updateTimestamp();
    started = true;
  }
}

function updateTimer() {
  timeLeft--;
  totalBothTime--;
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

  // Set the text
  setPomodoroText();

  if (timeLeft <= 0) {
    // Reset Timer and Header and Circle
    clearInterval(timerInterval);
    setCounter += 1;
    setPomodoroText();
    resetTimerHeader();
    progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');
    if (setCounter == 1 || setCounter % 2 != 0) {
      timeLeft = totalTime;
    } else {
      timeLeft = totalBreakTime;
    }

    totalBothTime = totalAllTime;
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000 ms)

    // Play Dings
    playAudio();
  }
}

// Function to set Text and color
function setPomodoroText(){
  if (setCounter == 1 || setCounter % 2 != 0) {
    backgroundBar.setAttribute('stroke', '#F15822');
    const displaySet = setCounter == 1 ? setCounter : setCounter - 1;
    const activityList = document.getElementById('activity-list');
    const listItems = activityList.children;
    const ListItem = listItems.item(displaySet-1) ? `Set ${displaySet} - ${listItems.item(displaySet-1).querySelector('#activity-name').textContent}` : `Set ${displaySet}`;
    setTitle.textContent = ListItem;
    setActivityNumber.textContent = displaySet;
    setEncouragement.textContent= encouragementList[randomIndex];
    
    //Displayset
    const al = document.getElementById('activity_xl');
    const activityLength = al.children.length; // End at length
    
    for (let hour = 0; hour < activityLength; hour++) {
      const selector2 = al.children[hour].querySelector('.activity-completed-text');
      selector2.textContent = " ";
      if (hour < displaySet - 1) {
        const selector = al.children[hour].querySelector('.activity-text');
        selector.style.color = '#24275C'; // Set blue for completed set
        const selector2 = al.children[hour].querySelector('.activity-completed-text');
        selector2.textContent = "\u00A0 Completed!";
        selector2.style.color = '#24275C'; // Set blue for completed set=
      } else if (hour === displaySet - 1) {
        al.children[hour].querySelector('.activity-text').style.color = '#F15822'; // Set orange for active set
      } else {
        al.children[hour].querySelector('.activity-text').style.color = 'black'; // Set black for inactive sets
      }
    }


  } else{
    backgroundBar.setAttribute('stroke', 'orange');
    setTitle.textContent = "BREAK";
    randomIndex = Math.floor(Math.random() * encouragementList.length);
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
  setActivityNumber.textContent = '';
  setEncouragement.textContent= 'Start an Activity';
  resetTimerHeader();
  progressBar.style.strokeDashoffset = progressBar.getAttribute('stroke-dasharray');
  playPauseIcon.src = './database/play.svg'; // Reset to play icon
  isPlaying = false; // Reset play/pause state
  const al = document.getElementById('activity_xl');
    const activityLength = al.children.length; // End at length
  for (let hour = 0; hour < activityLength; hour++) {
    const selector = al.children[hour].querySelector('.activity-text');
    selector.style.color = 'black'; // Set blue for completed set
    const selector2 = al.children[hour].querySelector('.activity-completed-text');
      selector2.textContent = " ";
  }
}


// Reset the timer h1
function resetTimerHeader() {
  let resetVariable = setCounter == 1 || setCounter % 2 != 0 ? totalTime : totalBreakTime;
  const minutesReset = Math.floor(resetVariable / 60);
  const secondsReset = resetVariable % 60;
  const timerDisplayReset = `${minutesReset.toString().padStart(2, '0')}:${secondsReset.toString().padStart(2, '0')}`;
  document.querySelector('h1').textContent = timerDisplayReset;
  backgroundBar.setAttribute('stroke', '#F15822');
  singleton.updateTimestamp();
}


// Skip the Timer
function skipTimer(){
  timeLeft=0;
  randomIndex = Math.floor(Math.random() * encouragementList.length);

}
// nowTime + remainingtime + orderedtime
function updateActivityList(){
  const activityList = document.getElementById('activity-list');
  const listItems = activityList.children;
  let time = Date.now();
  let newTime;
    for (let i = 1; i < listItems.length + 1 ; i++){
      // update if set counter has not passed ie sset 2
      if (i != 1 || setCounter >= (2 * i) - 1) {
        newTime = time  + (totalBothTime) + (i * 30 * 60 * 1000)
        listItems.item(i-1).querySelector('#activity-time').textContent = formatTime(newTime);
      } else {
        newTime = time  + (totalBothTime);
        listItems.item(i-1).querySelector('#activity-time').textContent = formatTime(newTime);
      }
    }
}


function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours > 0 ? hours : 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}


(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Browser
    root.timestampSingleton = factory();
  }
}(this, function () {
  return TimestampSingleton.getInstance();
}));

// Event listener for start/pause button
// document.getElementById('playPauseButton').addEventListener('click', togglePlayPause);

// Event listener for reset button
// resetButton.addEventListener('click', resetTimer);

// Optionally, you can also trigger startTimer() directly from the start button
// startButton.addEventListener('click', startTimer);
