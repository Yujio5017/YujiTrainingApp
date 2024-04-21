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
  