const formEl = document.getElementById("form");
const inputEl = document.querySelector(".input");
const liEl = document.querySelector(".todos");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  addTodo();
});

//* ADD TODO FUNCTION
function addTodo(todo) {
  let todoText = inputEl.value; // set todoText to whatever the input value is

  if (todo) {
    // if todo is passed in
    todoText = todo.text; // set todoText to todo.text
  }

  if (todoText) {
    // check if todoText exists
    const todoEl = document.createElement("li"); // create a todo element (list item)
    if (todo && todo.completed) {
      // if there is a todo and its been completed add the 'completed' class
      todoEl.classList.add("completed");
      console.log(todoEl.classList);
    }

    todoEl.innerText = todoText; // set the innerText of the todo element to todo inputted

    //* TOGGLE COMPLETED
    todoEl.addEventListener("click", () => {
      // on click of left mouse toggle completed class (strike through)
      todoEl.classList.toggle("completed");
      updateLS();
    });

    //* DELETE COMPLETED
    todoEl.addEventListener("contextmenu", (e) => {
      // contextmenu = right mouse button
      e.preventDefault(); // stops the menu pop up from loading

      todoEl.remove();
      updateLS();
    });

    liEl.appendChild(todoEl); // append the todo to the todo element

    inputEl.value = ""; // reset form

    updateLS(); // update local storage
  }
}

//* UPDATE LOCAL STORAGE FUNCTION
function updateLS() {
  todosEl = document.querySelectorAll("li"); // grab all todos as a node list

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText, // sets the text to the todo
      completed: todoEl.classList.contains("completed"), // if it contains 'completed' it will return true : false
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
