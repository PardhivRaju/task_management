const API_URL = 'http://localhost:5000/api/tasks';

// Fetch and display tasks
const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
};

// Render tasks in the DOM
const renderTasks = (tasks) => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
};

// Create or Update a Task
const saveTask = async (id) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const taskData = { title, description, status };

    if (id) {
        // Update task
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    } else {
        // Create task
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    }

    fetchTasks();
    closeModal();
};

// Delete a Task
const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
};

// Open edit modal
const editTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const task = await response.json();

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;

    document.getElementById('save-button').onclick = () => saveTask(id);
    openModal();
};

// Open and close modal functions
const openModal = () => {
    document.getElementById('modal').style.display = 'block';
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

// Initial fetch
fetchTasks();
