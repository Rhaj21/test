// Get input element and listen for 'Enter' key press
const inputElement = document.getElementById('taskInput');
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    taskInputValue();
  }
});

// Function to handle adding a task
function taskInputValue(value) {
  // Get trimmed input value
  const inputValue = value !== undefined ? value : inputElement.value.trim();
  if (inputValue === '' || inputElement === undefined) {
    inputElement.focus();
    return;
  }

  // Create task elements
  const taskContainer = document.createElement("div");
  const br = document.createElement("br");
  const taskChecker = document.createElement("input");
  const addTask = document.createElement("input");
  const deleteTask = document.createElement("div");
  deleteTask.classList.add("delete-task");

  const trashCan = document.createElement("div");
  trashCan.classList.add("trash-can");
  const lid = document.createElement("div");
  lid.classList.add("lid");
  const bin = document.createElement("div");
  bin.classList.add("bin");

  // Set attributes and classes
  taskContainer.classList.add("new-task-container");
  taskChecker.classList.add("task-checker");
  taskChecker.type = 'checkbox';

  addTask.type = 'text';
  addTask.classList.add("new-task");
  addTask.value = inputValue;
  addTask.defaultValue = inputValue;

  // Handle input blur event
  addTask.addEventListener('blur', () => {
    if (addTask.value.trim() === '') {
      addTask.value = addTask.defaultValue;
    } else {
      addTask.defaultValue = addTask.value;
    }
  });

  // Handle checkbox change
  taskChecker.addEventListener('change', () => {
    if (taskChecker.checked) {
      addTask.classList.add('taskChecked');
    } else {
      addTask.classList.remove('taskChecked');
    }
  });

  // Build delete button
  trashCan.appendChild(lid);
  trashCan.appendChild(bin);
  deleteTask.appendChild(trashCan);

  // Assemble task
  taskContainer.appendChild(br);
  taskContainer.appendChild(taskChecker);
  taskContainer.appendChild(addTask);
  taskContainer.appendChild(deleteTask);

  // Add task to container
  const container = document.getElementById("taskContainer");
  container.appendChild(taskContainer);

  // Clear input
  inputElement.value = '';

  // Handle task deletion
  deleteTask.onclick = function () {
    taskContainer.remove();
  };
}

// Example tasks
taskInputValue('Jog for 15 minutes');
taskInputValue('Do 10 push-ups');
taskInputValue('Water the plants');
taskInputValue('Wash the dishes');
taskInputValue('Meditate for 5 minutes');

tasks
fetch('http://localhost:5000/api/tasks')
  .then(res => res.json())
  .then(data => {
    console.log(data); // tasks from database
  });
