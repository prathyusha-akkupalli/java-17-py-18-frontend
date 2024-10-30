// ============ VARIABLES ===========
const form = document.getElementById("form");
const todo = document.getElementById("todo");
const submitBtn = document.getElementById("btn");
const container = document.getElementById("todo-container");
const alertBlock = document.getElementById("alert");

// Edit
let editID;
let editElement;
let editMode = false;

// Event Listeners
form.onsubmit = addTodo;
window.addEventListener("DOMContentLoaded", setTodos);

// Add todo
function addTodo(e) {
    e.preventDefault();
    let value = todo.value;
    if (value === "") {
        alertMessage("Please enter a value");
        return;
    }

    if (editMode) {
        editElement.textContent = value;
        editFromLocalStorage(editID, value);
        setDefault();
        return;
    }

    let id = Date.now().toString();
    let element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("w-3/4", "mx-auto", "flex", "justify-between");
    element.innerHTML = `
            <p>${value}</p>
            <div>
                <button id="edit">
                    <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                    </svg>
                </button>
                <button id="delete">
                    <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                    </svg>
                </button>
            </div>
    `;

    const editBtn = element.querySelector("#edit");
    editBtn.onclick = editTodo;
    const deleteBtn = element.querySelector("#delete");
    deleteBtn.onclick = deleteTodo;
    alertMessage("Task Added Successfully");
    container.appendChild(element);
    addToLocalStorage(id, value);
    setDefault();
}

function editTodo(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling;
    let element = e.currentTarget.parentElement.parentElement;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
    todo.value = editElement.textContent;
    editMode = true;
    console.log(editElement);
}
function deleteTodo(e) {
    let element = e.currentTarget.parentElement.parentElement;
    alertMessage("Task deleted");
    container.removeChild(element);
    deleteFromLocalStorage(element.dataset.id);
}

// Alert display
function alertMessage(message) {
    alertBlock.textContent = message;
    setTimeout(() => {
        alertBlock.textContent = "";
    }, 2000);
}

// Reset the value to default
function setDefault() {
    editMode = false;
    submitBtn.textContent = "Add";
    todo.value = "";
}

// Localstorage Functions
function getFromLocalStorage() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}
getFromLocalStorage();

function addToLocalStorage(id, value) {
    let todos = getFromLocalStorage();
    let todo = { id, value }; //same as {id: id, value: value}
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromLocalStorage(id) {
    let todos = getFromLocalStorage();

    todos = todos.filter((todo) => {
        if (todo.id !== id) return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editFromLocalStorage(id, value) {
    let todos = getFromLocalStorage();

    todos = todos.filter((todo) => {
        if (todo.id === id) todo.value = value;

        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Setup the existing todos
function setTodos() {
    let todos = getFromLocalStorage();
    todos.forEach((todo) => {
        setTodo(todo.id, todo.value);
    });
}

function setTodo(id, value) {
    let element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("w-3/4", "mx-auto", "flex", "justify-between");
    element.innerHTML = `
            <p>${value}</p>
            <div>
                <button id="edit">
                    <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                    </svg>
                </button>
                <button id="delete">
                    <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                    </svg>
                </button>
            </div>
    `;

    const editBtn = element.querySelector("#edit");
    editBtn.onclick = editTodo;
    const deleteBtn = element.querySelector("#delete");
    deleteBtn.onclick = deleteTodo;
    container.appendChild(element)
}
