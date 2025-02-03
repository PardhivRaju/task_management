const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('./tasks');

const app = express();
app.use(bodyParser.json());

app.get('/tasks', getTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

describe('Task API Endpoints', () => {
    it('should get all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should create a new task', async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            status: "pending"
        };
        const res = await request(app).post('/tasks').send(newTask);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newTask.title);
    });

    it('should get a task by ID', async () => {
        const res = await request(app).get('/tasks/1');
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        }
    });

    it('should update a task', async () => {
        const updatedTask = {
            title: "Updated Task",
            description: "Updated description",
            status: "completed"
        };
        const res = await request(app).put('/tasks/1').send(updatedTask);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe(updatedTask.title);
        }
    });

    it('should delete a task', async () => {
        const res = await request(app).delete('/tasks/1');
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(204);
        }
    });
});
