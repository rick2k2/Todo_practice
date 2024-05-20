// Retrieve the input field and add button
const ip = document.querySelector("#task_input");
const add_task = document.querySelector("#add_btn");

// Add event listener to the add button
add_task.addEventListener("click", add_new_task);

// Function to add a new task
function add_new_task() {
  const task_name = ip.value;
  // Call the createTask function to create the task element
  createTask(task_name);
  // Save tasks to local storage after adding a new task
  saveTasksToLocalStorage();
  // Clear the input field after adding the task
  ip.value = "";
}

// Function to create a new task element
function createTask(task_name) {
  // Retrieve the task container
  const task_container = document.querySelector("#task_container");
  // Create necessary elements for the task
  const task_div = document.createElement("div");
  const task_design = document.createElement("div");
  const task_line_design = document.createElement("p");
  const task_text = document.createElement("span");
  const delete_btn = document.createElement("button");

  // Set inner HTML for elements
  task_line_design.innerHTML = "";
  task_text.innerHTML = task_name;
  delete_btn.innerHTML = "❌";

  // Append elements to their respective parents
  task_container.appendChild(task_div);
  task_div.appendChild(task_design);
  task_design.appendChild(task_line_design);
  task_design.appendChild(task_text);
  task_div.appendChild(delete_btn);

  // Add classes to elements
  delete_btn.classList.add("btn");
  task_text.classList.add("task_text");
  task_line_design.classList.add("task_line");
  task_design.classList.add("task_design");
  task_div.classList.add("task");
  task_container.classList.add("task_container");

  // Add event listener to the delete button for each task
  delete_btn.addEventListener("click", () => {
    // Remove the task from the DOM
    task_div.remove();
    // Save tasks to local storage after deleting a task
    saveTasksToLocalStorage();
    // Alert task deleted
    alert("Task deleted");
  });
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = document.querySelectorAll(".task_text");
  const taskNames = [];
  tasks.forEach((task) => {
    taskNames.push(task.innerHTML);
  });
  localStorage.setItem("tasks", JSON.stringify(taskNames));
}

// Load tasks from local storage when the page is loaded
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTask(task));
};
