console.log("todo.ts is being executed");

function updateTitle(): void {
    const input = document.getElementById("list-title") as HTMLInputElement;
    const titleDisplay = document.getElementById("title-display") as HTMLElement;
    if (input) {
        titleDisplay.textContent = input.value.trim() || "Att-Göra-Lista";
    }
}

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

function getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}

function saveTodos(todos: Todo[]): void {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(): void {
    const todoList = document.getElementById("todo-list");
    if (!todoList) return;
    todoList.innerHTML = "";

    getTodos().forEach((todo) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleComplete('${todo.id}')">
            <span contenteditable="true" onblur="editTodo('${todo.id}', this.innerText)">${todo.text}</span>
            <button onclick="deleteTodo('${todo.id}')">❌</button>
    `;
    todoList.appendChild(li);
    });
}

function addTodo(): void {
    const input = document.getElementById("new-todo") as HTMLInputElement;

    console.log("Input element:", input);
    console.log("Input value:", input?.value);

    if (!input || input.value.trim() === "") return;

    const todos = getTodos();
    const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: input.value.trim(),
        completed: false,
    };

    console.log("New todo:", newTodo);

    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();

    input.value = "";
}


function editTodo(id: string, newText: string): void {
    const todos = getTodos().map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
    );
    saveTodos(todos);
}

function toggleComplete(id: string): void {
    const todos = getTodos().map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
    renderTodos();
}

function deleteTodo(id: string): void {
    const todos = getTodos().filter((todo) => todo.id !== id);
    saveTodos(todos);
    renderTodos();
}

function clearTodos(): void {
    localStorage.removeItem("todos");
    renderTodos();
}

document.addEventListener("DOMContentLoaded", renderTodos);
