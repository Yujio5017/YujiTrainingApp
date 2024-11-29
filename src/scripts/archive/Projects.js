const todoList2 = document.getElementById('todo-list2');
const todoInput2 = document.getElementById('todo-input2');
const completeByInput2 = document.getElementById('complete-by-input2');

// Function to create a new to-do item
function createTodoItem2(todoText, completeByDate) {
  const todoItem2 = document.createElement('div');
  todoItem2.classList.add('todo-item2');

  const todoTextElement = document.createElement('div');
  todoTextElement.textContent = todoText;

  const completeByElement = document.createElement('div');
  if (completeByDate) {
    completeByElement.textContent = `Complete by: ${completeByDate}`;
  }

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete-button2');
  deleteButton.addEventListener('click', function(event) {
    todoList2.removeChild(todoItem2);
    event.stopPropagation();
  });
  // Event listener to toggle completion on click
  todoItem2.addEventListener('click', function() {
    todoItem2.classList.toggle('completed');
  });

  todoItem2.appendChild(todoTextElement);
  if (completeByDate) {
    todoItem2.appendChild(completeByElement);
  }
  todoItem2.appendChild(deleteButton);

  todoList2.appendChild(todoItem2);
}

// Event listener to add new to-do when Enter is pressed in the input
todoInput2.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && todoInput2.value.trim() !== '') {
    createTodoItem2(todoInput2.value.trim(), completeByInput2.value);
    todoInput2.value = '';
    completeByInput2.value = ''; // Clear both inputs after adding the to-do
  }
});
