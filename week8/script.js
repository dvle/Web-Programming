// ---------- 1) DOM SELECTION ----------
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

const totalCountEl = document.getElementById("totalCount");
const doneCountEl = document.getElementById("doneCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
const filterButtons = document.querySelectorAll(".filters .btn");

const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const addBtn = document.getElementById('addBtn');
const emptyMessage = document.getElementById('emptyMessage');

// ---------- 2) APP STATE ----------
let tasks = [];
let currentFilter = "all";
let search = '';

// ---------- 3) LOCAL STORAGE HELPERS ----------
const STORAGE_KEY = "portfolio_todo_tasks";

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;
  tasks = JSON.parse(saved);
}

// ---------- 4) VALIDATION HELPERS ----------
function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

// ---------- 5) RENDERING ----------
function updateCounts() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  totalCountEl.textContent = `Total: ${total}`;
  doneCountEl.textContent = `Completed: ${completed}`;
}

function passesFilter(task) {
  // if (currentFilter === "all") return true;         
  if (currentFilter === "active") return !task.done;
  if (currentFilter === "completed") return task.done; 

  if (search !== '' && !task.text.toLowerCase().includes(search)) {
   return false;
  }

  return true;
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = `${task.text} - Added at ${task.time}`;

  if (task.done) {
    span.classList.add("done");
  }

  span.addEventListener("click", function () {
    task.done = !task.done;
    span.classList.toggle("done");
    saveTasks();
    render();
  });

  const btnBox = document.createElement("div");
  btnBox.classList.add("task-buttons");

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.textContent = "Delete";
  delBtn.classList.add("btn", "danger", "small");

  delBtn.addEventListener("click", function () {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    render();
  });

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn', 'small');

  editBtn.addEventListener('click', function() {
    const newText = prompt('Edit task:', task.text);
    if (newText === null) return;

    const cleared = newText.trim();
    if (cleared === '') {
      showError('Task cannot be empty.');
      return;
    }

    const taskExists = tasks.some(
      t => t.text.toLowerCase() === cleared.toLowerCase() && t.id !== task.id
    );

    if (taskExists) {
      showError('Task already exists.');
      return;
    }

    task.text = cleared;
    saveTasks();
    render();
  });

  btnBox.appendChild(editBtn);
  btnBox.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(btnBox);
  return li;
}

function render() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(passesFilter);
  if (filteredTasks.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }

  for (const task of filteredTasks) {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  }

  updateCounts();
}

// ---------- 6) EVENTS ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    addBtn.disabled = true;
    return;
  }

  const exists = tasks.some(
    t => t.text.toLowerCase() === text.toLowerCase()
  );

  if (exists) {
    showError('Task already exists.');
    return;
  }

  clearError();
  let time = new Date()
  const timestamp = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const newTask = {
    id: Date.now(),   
    time: timestamp,
    text: text,       
    done: false
  };

  tasks.push(newTask);
  saveTasks();
  input.value = "";
  charCounter.textContent = 'Characters: 0';
  render();
});

input.addEventListener("input", function () {
  let length = input.value.length;
  charCounter.textContent = `Characters: ${length}`;
  addBtn.disabled = input.value.trim() === "";

  if (input.value.trim() !== "") {
    clearError();
  }
});

searchInput.addEventListener('input', function() {
  search = searchInput.value.toLowerCase();
  render();
})

clearCompletedBtn.addEventListener("click", function () {
  tasks = tasks.filter(t => !t.done);

  saveTasks();
  render();
});

clearAllBtn.addEventListener("click", function () {
  const confirmDelete = confirm("Are you sure you want to delete all tasks?");
  if (!confirmDelete) return;
  tasks = [];

  saveTasks();
  render();
});

for (const btn of filterButtons) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;

    for (const b of filterButtons) {
      b.classList.remove("active");
    }

    btn.classList.add("active");
    render();
  });
}

// ---------- 7) INIT ----------
loadTasks();
render();