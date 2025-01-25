interface Task {
    id: String;
    title: String;
    description?: String;
    completed: Boolean;
}

// Task list array
let tasks: Task[] = [];

// DOM elements
const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskTitle = document.getElementById('task-title') as HTMLInputElement;
const taskDescription = document.getElementById('task-description') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;

// Add task
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    if(!title) return;

    const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
    taskForm.reset();
});

// Toggle task
const toggleTask = (id: String) => {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
};

// Delete task
const deleteTask = (id: String) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
};

// Render tasks
const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span class="flex-1">${task.title}</span>
            <div>
                <button class="bg-blue-500 text-white px-2 py-1 rounded" onclick="toggleTask('${task.id}')">Complete</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// Expose toggle
(window as any).toggleTask = toggleTask;
(window as any).deleteTask = deleteTask;