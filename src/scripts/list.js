const timestampSingleton = window.timestampSingleton;
const activityList = document.getElementById('activity-list');
const activityInput = document.getElementById('activity-input');
const addActivityBtn = document.getElementById('add-activity-btn');

const focusList = document.getElementById('focus-list');
const focusInput = document.getElementById('focus-input');
const focusComplete = document.getElementById('focus-complete');


let focusItems = focusList.children;
let activityItems = activityList.children;

const observer = new MutationObserver(updateFocusCount);
observer.observe(focusList, { childList: true });

// 
function updateFocusCount() {
  let focusCount = focusItems.length;
  // Hide the input field if the count reaches 3
  if (focusCount >= 3) {
    focusInput.style.display = 'none';
    focusComplete.style.backgroundColor = 'rgb(37, 182, 32)'
    focusComplete.textContent = 'Complete';
  
  } else {
    focusInput.style.display = 'inline-block';
    focusComplete.style.color = (focusCount==0) ? '#818181' : 'black'
    focusComplete.textContent = `In Progress ${focusCount}/3`;
    focusComplete.style.backgroundColor = (focusCount==0) ? '#f0f0f0':'yellow';
  }
}

// On button 'ENTER'
focusInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addFocus()
  }
});


// On button 'CLICK'
addActivityBtn.addEventListener('click', () => {
  addActivity()
});

// On button 'ENTER'
activityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addActivity()
  }
});

// Function Add Focus
function addFocus(){
  const newFocus = focusInput.value.trim();
  if (newFocus) {
    const listItem = document.createElement('li');
    listItem.textContent = newFocus;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
    });
    listItem.appendChild(deleteBtn);
    focusList.appendChild(listItem);
    focusInput.value = '';
  }
}


// Function Add Activity
function addActivity(){
  const newActivity = activityInput.value.trim();
  if (newActivity) {
    const listItem = document.createElement('li');
    const textItem = document.createElement('p');
    textItem.id = 'activity-name';
    textItem.textContent = newActivity;
    const timeItem = document.createElement('p');
    timeItem.id = 'activity-time';
    timeItem.textContent = getTimePrediction();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
    });
    // listItem.appendChild(timeItem);
    listItem.appendChild(textItem);
    listItem.appendChild(deleteBtn);
    activityList.appendChild(listItem);
    activityInput.value = '';
  }
}


function getTimePrediction(){
  const activityCount = activityItems.length + 1;
  const timestampPlus30Minutes = timestampSingleton.getTimestamp() + (activityCount * 30 * 60 * 1000);
  const formattedString = formatTime(timestampPlus30Minutes);

  return formattedString;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours > 0 ? hours : 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}