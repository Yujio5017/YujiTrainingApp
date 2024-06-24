const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const completeByInput = document.getElementById('complete-by-input');

// Function to fetch initial to-do items from JSON file
async function fetchTodos() {
  try {
    const response = await fetch('./database/todos.json');
    const todos = await response.json();
    todos.forEach(todo => {
      createTodoItem(todo.text, todo.completeBy, todo.id);
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Function to create a new to-do item
function createTodoItem(todoText, completeByTime, todoId) {
// // Create a checkbox element
// var checkbox = document.createElement('input');

// // Set the type attribute to checkbox
// checkbox.type = 'checkbox';
// checkbox.classList.add('checkbox');
// todoList.appendChild(checkbox);

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  todoItem.textContent = todoText;

  // If a completion time is provided, add it to the to-do item
  if (completeByTime) {
    const completeByElement = document.createElement('div');
    completeByElement.classList.add('complete-by');
    // Display only the hours and minutes portion
    const timeParts = completeByTime.split(':');
      const hours = timeParts[0];
      const minutes = timeParts[1];
      completeByElement.textContent = `Complete by: ${hours}:${minutes}`;
    todoItem.appendChild(completeByElement);
  }

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function(event) {
    todoList.removeChild(todoItem);
    deleteTodoItem(todoId); // Delete the item from JSON file
    console.log("deleting from json")
    event.stopPropagation();
  });
  // Create divider 
  const divider = document.createElement('div');
  divider.classList.add('divider');
  // Event listener to toggle completion on click
  todoItem.addEventListener('click', function() {
    todoItem.classList.toggle('completed');
    updateJsonFile(); // Update JSON file when completion status changes
  });

  // Append delete button to the to-do item
  todoItem.appendChild(deleteButton);

  // Append the new to-do item to the list
  todoList.appendChild(todoItem);

  todoList.appendChild(divider);
}

// Function to delete a to-do item from the JSON file
function deleteTodoItem(todoId) {
  fetch('./database/delete-todo.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: todoId })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    updateJsonFile();
  })
  .catch(error => console.error('Error deleting todo:', error));
}

// Function to update the JSON file with current to-do list data
function updateJsonFile() {
    const todos = [];
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
      const text = item.querySelector('.todo-text').textContent;
      const completeByElement = item.querySelector('.complete-by');
      let completeBy = '';
      if (completeByElement) {
        const completeByText = completeByElement.textContent;
        const timeIndex = completeByText.indexOf(':');
        if (timeIndex !== -1) {
          completeBy = completeByText.substring(timeIndex - 2, timeIndex + 6).trim();
        }
      }
      todos.push({ id: index + 1, text, completeBy });
    });

  fetch('./database/update-todos.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todos)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update todos');
    }
  })
  .catch(error => console.error('Error updating todos:', error));
}

// Function to add new to-do when Enter is pressed in the input
todoInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && todoInput.value.trim() !== '') {
    createTodoItem(todoInput.value.trim(), completeByInput.value);
    todoInput.value = '';
    completeByInput.value = ''; // Clear both inputs after adding the to-do
    updateJsonFile(); // Update JSON file after adding a new to-do
  }
});

// Fetch initial to-do items when the page loads
fetchTodos();
