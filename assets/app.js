const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// --- Add a new task ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (!task) return;

    const res = await fetch('/api/todos', {  
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task})
    });
    const data = await res.json();
    addTodoToDOM(data);
    input.value = '';
});

// --- Add task to the DOM ---
function addTodoToDOM(todo) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = todo.task;

    const buttonsDiv = document.createElement('div'); // Container for buttons
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '5px'; // Space between buttons

    // --- Edit button ---
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = async () => {
        const newTask = prompt('Edit Task', todo.task);
        if (!newTask) return;
        const res = await fetch(`/api/todos/${todo._id}`, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({task: newTask})
        });
        const updatedTodo = await res.json();
        span.textContent = updatedTodo.task;
    };

    // --- Delete button ---
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = async () => {
        await fetch(`/api/todos/${todo._id}`, { method: 'DELETE' }); 
        li.remove();
    };

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    list.appendChild(li);
}

// --- Load tasks when the page starts ---
async function loadTodos() {
    const res = await fetch('/api/todos'); 
    const todos = await res.json();
    todos.forEach(addTodoToDOM);
}

loadTodos();