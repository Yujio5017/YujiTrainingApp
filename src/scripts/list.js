const activityList = document.getElementById('activity-list');
const activityInput = document.getElementById('activity-input');
const addActivityBtn = document.getElementById('add-activity-btn');

addActivityBtn.addEventListener('click', () => {
  const newActivity = activityInput.value.trim();
  if (newActivity) {
    const listItem = document.createElement('li');
    listItem.textContent = newActivity;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      listItem.remove();
    });
    listItem.appendChild(deleteBtn);
    activityList.appendChild(listItem);
    activityInput.value = '';
  }
});