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

const observer2 = new MutationObserver(updateActivityCount)
observer2.observe(activityList, { childList: true });

function updateFocusCount() {
  let focusCount = focusItems.length;
  // Hide the input field if the count reaches 4
  if (focusCount >= 3) {
    focusInput.style.display = 'none';
    focusComplete.style.backgroundColor = '#F15822'
    focusComplete.textContent = 'Completed';
  
  } else {
    focusInput.style.display = 'inline-block';
    focusComplete.style.color = (focusCount===0) ? 'black' : 'black';
    focusComplete.textContent = `In Progress ${focusCount}/3`;
    focusComplete.style.backgroundColor = (focusCount===0) ? '#4CAF50;':'#869AAC';
  }
}

function updateActivityCount() {
  let activityCount = activityItems.length;
  // Hide the input field if the count reaches 4 
  if (activityCount >= 14) {
    activityInput.style.display = 'none';
    addActivityBtn.style.backgroundColor = '#869AAC';
    addActivityBtn.textContent = 'Full! 14/14';
  
  } else {
    activityInput.style.display = 'inline-block';
    addActivityBtn.style.color = (activityCount===0) ? 'black' : 'black'
    addActivityBtn.textContent = `Add Activity`;
    addActivityBtn.style.backgroundColor = (activityCount===0) ? '#4CAF50;':'#F15822';
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
    const deleteBtn = document.createElement('div');
    const al = document.getElementById('focus-list');
    const al_length = al.children.length;
    deleteBtn.id = "focus-delete";
    deleteBtn.textContent = `. ${al_length+1}x`;
    deleteBtn.className = 'delete-button';
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
      updateFocus();
    });
    listItem.appendChild(deleteBtn);
    focusList.appendChild(listItem);
    focusInput.value = '';
  }
}

function updateFocus(){
  const al = document.getElementById('focus-list');
  const activitylength = al.children.length; // End at 11 PM
  for (let pointer = 0; pointer < activitylength; pointer++) {
    al.children[pointer].querySelector('#focus-delete').textContent=`. ${pointer+1}x`;
  }
}

function updateActivity(){
  const al = document.getElementById('activity-list');
  const activitylength = al.children.length; // End at 11 PM
  for (let pointer = 0; pointer < activitylength; pointer++) {
    al.children[pointer].querySelector('#activity-delete').textContent=`. ${pointer+1}x`;
  }
}

// Function Add Activity
function addActivity(){
  const newActivity = activityInput.value.trim();
  if (newActivity) {
    const listItem = document.createElement('li');
    const div1 = document.createElement('div');
    div1.className = 'activity-content';
    const textItem = document.createElement('p');
    textItem.id = 'activity-name';
    textItem.textContent = newActivity;
    const timeItem = document.createElement('p');
    timeItem.id = 'activity-time';
    timeItem.textContent = getTimePrediction();
    const deleteBtn = document.createElement('div');
    deleteBtn.id = "activity-delete";
    const ul = document.getElementById('activity-list');
    const ul_length = ul.children.length;
    deleteBtn.textContent = `. ${ul_length+1}x`;
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
      generateActivity();
      updateActivity();
    });
    // listItem.appendChild(timeItem);
    div1.appendChild(textItem);
    div1.appendChild(deleteBtn);
    listItem.appendChild(div1);
    activityList.appendChild(listItem);
    activityInput.value = '';
  }
  generateActivity();
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