const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load saved tasks
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
};

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');
  
  li.textContent = text;

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
