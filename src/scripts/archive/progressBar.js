document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      updateProgressBar();
    }, 10000); // Delay in milliseconds (10 seconds)
  
    // Update progress bar for time-capsule
    function updateProgressBar() {
      var currentTime = new Date();
      var startTime = new Date();
      startTime.setHours(7, 0, 0); // Set start time to 7 am
      var endTime = new Date();
      endTime.setHours(22, 0, 0); // Set end time to 10 pm
  
      var elapsedTime = currentTime - startTime;
      var totalTime = endTime - startTime;
      var progressPercentage = (elapsedTime / totalTime) * 100;
  
      if (progressPercentage > 100) {
        progressPercentage = 100;
      }
  
      // var progressBar = document.querySelector('.progress2');
      // progressBar.style.width = progressPercentage + '%';
  
      // Schedule next update
      setTimeout(updateProgressBar, 60000); // Update every minute
    }
  });
  
