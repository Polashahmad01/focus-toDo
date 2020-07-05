const form = document.getElementById("focus-form");
const focusList = document.querySelector(".collection");
const clearFocus = document.querySelector(".clear-focus");
const focusInput = document.querySelector("#focus-task");
const filterFocus = document.querySelector("#filter");

// Load All Event Listener
loadAllEventListener();

// LoadAllEventListener
function loadAllEventListener() {
  // Show List
  document.addEventListener("DOMContentLoaded", showFocus);

  // Add focus event
  form.addEventListener("submit", addFocus);

  //Remove focus event
  focusList.addEventListener("click", removeFocus);

  //Clear focus event
  clearFocus.addEventListener("click", clearAllFocus);

  //Filter focus event
  filterFocus.addEventListener("keyup", filterAllFocus);
}

// showFocus
function showFocus() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement("li");

    //Add ClassName
    li.className = "focus-item";

    //Get input value & appen to li
    li.appendChild(document.createTextNode(task));

    //Append li to ul
    focusList.appendChild(li);

    //Create link element
    const link = document.createElement("a");

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Add className
    link.className = "delete-focus";

    //Append a to li
    li.appendChild(link);
  });
}

// addFocus
function addFocus(e) {
  //Get input value
  const focus = focusInput.value;

  //Check input
  if (focus === "") {
    alert("Please Add Your Focus First");
  } else {
    //Create li element
    const li = document.createElement("li");

    //Add ClassName
    li.className = "focus-item";

    //Get input value & appen to li
    li.appendChild(document.createTextNode(focus));

    //Append li to ul
    focusList.appendChild(li);

    //Create link element
    const link = document.createElement("a");

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Add className
    link.className = "delete-focus";

    //Append a to li
    li.appendChild(link);

    // Store Focus on Ls
    storeFocusOnLocalStorage(focus);

    //Clear input when focus submit
    focusInput.value = "";
  }

  e.preventDefault();
}

// Save focus on localStorage
function storeFocusOnLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//removeFocus
function removeFocus(e) {
  if (e.target.parentElement.classList.contains("delete-focus")) {
    e.target.parentElement.parentElement.remove();

    // Remove Focus from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }

  e.preventDefault();
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// removeAllFoucs
function clearAllFocus() {
  //Showest Way
  //focusList.innerHTML = "";

  if (confirm("Are You Sure")) {
    while (focusList.firstChild) {
      focusList.removeChild(focusList.firstChild);
    }
  }

  // Clear form LS
  clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filterAllFocus
function filterAllFocus(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".focus-item").forEach(function (focus) {
    const item = focus.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      focus.style.display = "block";
    } else {
      focus.style.display = "none";
    }
  });
}
