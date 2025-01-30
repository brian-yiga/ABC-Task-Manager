document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");
  const listContainer = document.getElementById("listContainer");
  const totalTasks = document.getElementById("totalTasks");
  //initialize an empty array on opening app or retrieve any tasks already in local storage
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  updateTaskListDisplay();

  function addNewTask() {
    if (input.value === "") {
      alert("Enter a task to be added");
      return;
    }

    const newTask = { task: input.value, completed: false };
    taskList.push(newTask);

    //add the new task to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    updateTaskListDisplay();
    input.value = "";
    console.log(taskList);
  }

  function updateTaskListDisplay() {
    listContainer.innerHTML = ""; //clear current list

    taskList.forEach((task, index) => {
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.classList.add("checkboxBtn");

      const li = document.createElement("li");
      li.classList.add("task-item");

      const taskText = document.createElement("span");
      taskText.textContent = task.task;

      //logic for the checkbox
      if (task.completed) {
        checkBox.checked = true;
        li.style.textDecoration = "line-through";
        li.style.color = "#f68712";
      } else {
        checkBox.checked = false;
        li.style.textDecoration = "none";
        li.style.color = "#0f0147";
      }
      checkBox.addEventListener("change", () => {
        task.completed = checkBox.checked;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        updateTaskListDisplay();
      });

      const editBtn = document.createElement("button");
    //   editBtn.textContent = "Edit";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.classList.add("editBtn");

      editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "Edit") {
          //change the taskText into an input field with the value as the taskText
          const editInput = document.createElement("input");
          editInput.type = "text";
          editInput.value = task.task;
          editInput.classList.add("editInput");
          // Replace task text with input field
          li.replaceChild(editInput, taskText);
          editBtn.textContent = "Save";

          editInput.focus();
        } else {
          //save edited task
          const editInput = li.querySelector(".editInput");
          if (editInput.value.trim() === "") {
            alert("Text Field can not be Empty");
            return;
          }

          task.task = editInput.value.trim();
          localStorage.setItem("tasks", JSON.stringify(taskList));

          // Create new text span and replace input field
          const newTaskText = document.createElement("span");
          newTaskText.textContent = task.task;

          li.replaceChild(newTaskText, editInput);
          editBtn.textContent = "Edit";

          taskText = newTaskText; // Update reference to new task text
        }
      });

      const deleteBtn = document.createElement("button");
    //   deleteBtn.textContent = "Delete";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("deleteBtn");

      deleteBtn.addEventListener("click", function () {
        taskList.splice(index, 1);

        //update localStorage after task deletion
        localStorage.setItem("tasks", JSON.stringify(taskList));

        updateTaskListDisplay();
      });

      li.appendChild(checkBox);
      li.appendChild(taskText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      listContainer.appendChild(li);
    });
  }

  //Handle input and keyPress;
  function handleOnKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTask();
    }
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addNewTask();
  });

  input.addEventListener("keypress", handleOnKeyPress);

  //Add functionality to Total Tasks and Clear All
  clearBtn.addEventListener("click", () => {
    taskList.splice(0, taskList.length);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    updateTaskListDisplay();
  });

  totalTasks.textContent = `Total Tasks: ${taskList.length}`;
});
