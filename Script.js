const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input'); 
const dateInput = document.getElementById('date-input');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const task = taskInput.value;   // Corrected assignment
    const date = dateInput.value;   // Corrected assignment

    if (task && date) {
        addTaskToList(task, date);
        saveTask(task, date);
        taskInput.value = '';       // Reset the input field
        dateInput.value = '';       // Reset the input field
    }
});

// Function to add task to the list (HTML)
function addTaskToList(task, date) {
    const li = document.createElement('li');  // Corrected assignment
    li.innerHTML = `
        ${date} - ${task} 
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    todoList.appendChild(li);

    // Add event listeners for edit and delete buttons
    li.querySelector('.delete').addEventListener('click', deleteTask);
    li.querySelector('.edit').addEventListener('click', editTask);
}

// Save task to localStorage
function saveTask(task, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // let instead of Let
    tasks.push({ task, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // let instead of Let
    tasks.forEach(taskObj => addTaskToList(taskObj.task, taskObj.date)); // Correct taskObj.date
}

// Delete task
function deleteTask(e) {
    const li = e.target.parentElement;  // Corrected assignment
    const task = li.innerText.split('-')[1].split('Edit')[0].trim();
    li.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')); // let instead of Let
    tasks = tasks.filter(taskObj => taskObj.task !== task); // Corrected assignment
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit task
function editTask(e) {
    const li = e.target.parentElement;  // Corrected assignment
    const task = li.innerText.split('-')[1].split('Edit')[0].trim();
    const date = li.innerText.split('-')[0].trim();  // Corrected to extract date

    // Pre-fill input fields with current values
    taskInput.value = task;
    dateInput.value = date;

    deleteTask(e);  // Remove the old entry while editing
}