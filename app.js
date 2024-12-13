const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const themeToggleButton = document.getElementById("toggle-theme-btn");
const currentTheme = localStorage.getItem("theme");

loadTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");

  const task = taskInput.value;
  console.log(task);

  if (task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = "";
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task;
  li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn"));
  return li;
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn;
}

taskList.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target.classList.contains("delete-btn")) {
    deleteTask(e.target.parentElement);
  } else if (e.target.classList.contains("edit-btn")) {
    editTask(e.target.parentElement);
  }
});

function deleteTask(taskItem) {
  if (confirm("¿Estas seguro de borras este elemento?")) {
    taskItem.remove();
    updateLocalStorage();
  }
}
function editTask(taskItem) {
  const newTask = prompt(
    "Ingresa la nueva tarea:",
    taskItem.firstChild.textContent
  );
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask;
    updateLocalStorage();
  }
}

function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((element) => {
    taskList.appendChild(createTaskElement(element));
  });
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.firstChild.textContent
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const theme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("theme", theme);
  console.log("hola");
});

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}
