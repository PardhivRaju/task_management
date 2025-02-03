const API_URL = 'http://localhost:5000/api/tasks';

const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
};

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

const saveTask = async (id) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const taskData = { title, description, status };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
    }

    fetchTasks();
    closeModal();
};

const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
};

const editTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const task = await response.json();

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;

    document.getElementById('save-button').onclick = () => saveTask(id);
    openModal();
};

const openModal = () => {
    document.getElementById('modal').style.display = 'block';
};

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

fetchTasks();
