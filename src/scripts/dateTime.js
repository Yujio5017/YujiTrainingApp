function updateDate() {
    // Get the current date
    var now = new Date();
  
    // Extract day and month
    var day = ('0' + now.getDate()).slice(-2);
    var date = now.getDate();
    // Determine the suffix for the day
    var suffix = getDaySuffix(date);
    // Array of month names
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    var month = months[now.getMonth()];
    // Remove the leading '0' if present
    if (day.startsWith('0')) {
      day = day.slice(1);
    }
    // Build the date string
    var dateString = day + suffix + ' ' + month;
  
    // Update the date element with the current date
    document.getElementById('date').innerHTML = dateString.toUpperCase();
  }
  
  function getDaySuffix(day) {
    // Determine the suffix for the day
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
  function updateTime() {
    // Get the current time
    var now = new Date();
  
    // Extract hours, minutes, and seconds
    var hours = now.getHours();
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    // Determine AM or PM
    var amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 as 12
  
    // Build the time string
    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + amPm;
  
    // Update the time element with the current time
    document.getElementById('time').innerHTML = timeString;
  }
  
  // Call updateDate and updateTime to update the date and time initially
  updateDate();
  updateTime();
  
  // Call updateDate and updateTime every second to update the date and time
  setInterval(function() {
    updateDate();
    updateTime();
  }, 1000);
  

// Function to generate time slots
function generateTimelines() {
  const timelines = document.getElementById("timeline_s");
  const timelinexl = document.getElementById("timeline_xl");
  const startHour = 6; // Start at 6 AM
  const endHour = 23; // End at 11 PM
  const currentHour = new Date().getHours();

  // Clear existing content
  timelines.innerHTML = "";
  timelinexl.innerHTML = "";

  for (let hour = startHour; hour <= endHour; hour++) {
    // Create time slot for first timeline
    const timeSlot1 = document.createElement("div");
    timeSlot1.classList.add("time-slot");
    timeSlot1.id = `timeline_s-hour-${hour}`;

    if (hour === currentHour) {
      const circle1 = document.createElement("div");
      circle1.classList.add("circle-small");
      timeSlot1.appendChild(circle1);
    }

    const timeText1 = document.createElement("span");
    timeText1.classList.add("timeline-text");
    timeText1.textContent = `${hour}:00`;
    timeSlot1.appendChild(timeText1);
    timelines.appendChild(timeSlot1);

    // Create time slot for second timeline
    const timeSlot2 = document.createElement("div");
    timeSlot2.id = `timeline_xl-hour-${hour}`;
    timeSlot2.classList.add("time-slot");

    if (hour === currentHour) {
      console.log("safe");
      const circle2 = document.createElement("div");
      circle2.classList.add("circle");
      timeSlot2.appendChild(circle2);
    }

    const timeText2 = document.createElement("span");
    timeText2.classList.add("timetext");
    timeText2.textContent = `${hour}:00`;
    timeSlot2.appendChild(timeText2);
    timelinexl.appendChild(timeSlot2);
  }
}



function generateActivity() {
  const activityxl = document.getElementById("activity_xl");
  const startActivity = 0; // Start at 6 AM
  const al = document.getElementById('activity-list');
  const activitylength = al.children.length; // End at length

  // Clear existing content
  activityxl.innerHTML = "";
  const setActivityNumber = document.getElementById('activity-number');
  for (let hour = startActivity; hour < activitylength; hour++) {
    // Create time slot for first timeline
    const timeSlot1 = document.createElement("div");
    timeSlot1.classList.add("activity-slot");
    timeSlot1.id = `activity-${hour+1}`;
    const timeItem = document.createElement('p');
    timeItem.id = 'activity-position';
    timeItem.textContent=`${hour+1} |` + "\u00A0";
    const timeText1 = document.createElement("p");
    timeText1.classList.add("activity-text");
    timeText1.textContent = `${al.children[hour].querySelector('#activity-name').textContent}`;
    const timeText2 = document.createElement("p");
    timeText2.classList.add("activity-completed-text");
    const setTitle = document.getElementById('setTitle');
    colorActivity(hour,displaySet,timeText1,timeText2,setTitle.textContent);
    timeSlot1.appendChild(timeItem);
    timeSlot1.appendChild(timeText1);
    timeSlot1.appendChild(timeText2);
    activityxl.appendChild(timeSlot1);
  }
}



function colorActivity(hourV,displaySetV,text1,text2,breakV) {
  if (hourV < displaySetV - 1) {
      // Completed sets
      text1.style.color = '#24275C'; 
      text2.textContent = "\u00A0 Completed!";
      text2.style.color = '#24275C'; 
    } else if (hourV === displaySetV - 1) {
      // Current set (if not a break)
      if (breakV==="BREAK"){
        text1.style.color = '#24275C'; 
        text2.textContent = "\u00A0 Completed!";
        text2.style.color = '#24275C'; 
      } else{
        text1.style.color = '#F15822'; 
        text2.textContent = " "; // Clear completed text
      }
    } else {
      // Future sets
      text1.style.color = 'black'; 
      text2.textContent = " "; // Clear completed text
    }
}

// Initial call to generate timelines
generateTimelines();

generateActivity();

// Set interval to update every hour
setInterval(generateTimelines, 60 * 60 * 1000); // 1 hour = 60 minutes * 60 seconds * 1000 ms

// Optional: Update immediately if the current minute is 0
setTimeout(generateTimelines, (60 - new Date().getMinutes()) * 60 * 1000);