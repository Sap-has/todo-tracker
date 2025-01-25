"use strict";
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
// Task list array
var tasks = [];
// DOM elements
var taskForm = document.getElementById('task-form');
var taskTitle = document.getElementById('task-title');
var taskDescription = document.getElementById('task-description');
var taskList = document.getElementById('task-list');
// Add task
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var title = taskTitle.value.trim();
    var description = taskDescription.value.trim();
    if (!title)
        return;
    var newTask = {
        id: Date.now().toString(),
        title: title,
        description: description,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
    taskForm.reset();
});
// Toggle task
var toggleTask = function (id) {
    tasks = tasks.map(function (task) {
        return task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task;
    });
    renderTasks();
};
// Delete task
var deleteTask = function (id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
};
// Render tasks
var renderTasks = function () {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = `flex justify-between items-center p-2 mb-2 border rounded ${task.completed ? "bg-green-100" : "bg-white"}`;
        li.innerHTML = "\n            <span class=\"flex-1\">".concat(task.title, "</span>\n            <div>\n                <button class=\"bg-blue-500 text-white px-2 py-1 rounded\" onclick=\"toggleTask('").concat(task.id, "')\">Complete</button>\n                <button class=\"bg-red-500 text-white px-2 py-1 rounded\" onclick=\"deleteTask('").concat(task.id, "')\">Delete</button>\n            </div>\n        ");
        taskList.appendChild(li);
    });
};
// Expose toggle
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
