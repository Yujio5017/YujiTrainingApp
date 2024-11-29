const ele = document.getElementById('ipl-progress-indicator');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('main-video');
const mainContainer = document.getElementById('main-container');

function goToPage(page) {
  // Navigate to the specified page
  window.location.href = page;
}

// REMOVE
// videoContainer.remove();
// Pause the video to ensure it doesn't continue playing after removal
// video.pause();

if (ele) {
  // Set a timeout to remove the loading screen after 2 seconds
  setTimeout(() => {
    // Remove the loading screen from the DOM
    ele.remove();
    // Set a timeout to play the video after 1 second
    // Listen for the 'ended' event on the video element
    // video.addEventListener('ended', () => {
    //   // Remove the video element from the DOM after it has finished playing once
    //   videoContainer.remove();
    //   mainContainer.classList.add('dashboard');
    // });
    // Play the video
    // video.play();

    // REMOVE
    }, 1500); // Remove the loading screen after 2 seconds
  // }, 300); // Remove the loading screen after 2 seconds
}
