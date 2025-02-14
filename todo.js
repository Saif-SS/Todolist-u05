var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
console.log("todo.ts is being executed");
function updateTitle() {
    var input = document.getElementById("list-title");
    var titleDisplay = document.getElementById("title-display");
    if (input) {
        titleDisplay.textContent = input.value.trim() || "Att-Göra-Lista";
    }
}
function getTodos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function renderTodos() {
    var todoList = document.getElementById("todo-list");
    if (!todoList)
        return;
    todoList.innerHTML = "";
    getTodos().forEach(function (todo) {
        var li = document.createElement("li");
        li.innerHTML = "\n            <input type=\"checkbox\" ".concat(todo.completed ? "checked" : "", " onchange=\"toggleComplete('").concat(todo.id, "')\">\n            <span contenteditable=\"true\" onblur=\"editTodo('").concat(todo.id, "', this.innerText)\">").concat(todo.text, "</span>\n            <button onclick=\"deleteTodo('").concat(todo.id, "')\">\u274C</button>\n    ");
        todoList.appendChild(li);
    });
}
function addTodo() {
    var input = document.getElementById("new-todo");
    console.log("Input element:", input); // Debugging
    console.log("Input value:", input === null || input === void 0 ? void 0 : input.value); // Debugging
    if (!input || input.value.trim() === "")
        return; // Prevent adding empty tasks
    var todos = getTodos();
    var newTodo = {
        id: crypto.randomUUID(),
        text: input.value.trim(), // ✅ This should now capture the correct value
        completed: false,
    };
    console.log("New todo:", newTodo); // Debugging
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos();
    input.value = ""; // ✅ Clear input after adding
}
function editTodo(id, newText) {
    var todos = getTodos().map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { text: newText }) : todo;
    });
    saveTodos(todos);
}
function toggleComplete(id) {
    var todos = getTodos().map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
    });
    saveTodos(todos);
    renderTodos();
}
function deleteTodo(id) {
    var todos = getTodos().filter(function (todo) { return todo.id !== id; });
    saveTodos(todos);
    renderTodos();
}
function clearTodos() {
    localStorage.removeItem("todos");
    renderTodos();
}
document.addEventListener("DOMContentLoaded", renderTodos);
