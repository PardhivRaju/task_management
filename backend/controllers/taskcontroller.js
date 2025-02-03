const fs = require('fs');
const tasksFile = './backend/tasks.json';

let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));

const writeTasks = (data) => fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2));

// Get all tasks
const getTasks = (req, res) => res.json(tasks);

// Get task by ID
const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
};

// Create a task
const createTask = (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) return res.status(400).json({ error: "Invalid input" });

    const newTask = { 
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title, 
        description, 
        status, 
        created_at: new Date(), 
        updated_at: new Date()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

    tasks[taskIndex] = { 
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description,
        status: status || tasks[taskIndex].status,
        updated_at: new Date()
    };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
};

// Delete a task
const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.status(204).send();
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
