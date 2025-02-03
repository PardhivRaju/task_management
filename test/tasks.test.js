const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

describe('Task Routes API', () => {
    it('should fetch all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should create a new task', async () => {
        const newTask = {
            title: "Test Task",
            description: "Testing task creation",
            status: "pending"
        };
        const res = await request(app).post('/tasks').send(newTask);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newTask.title);
    });

    it('should fetch a task by ID', async () => {
        const res = await request(app).get('/tasks/1');
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        }
    });

    it('should update an existing task', async () => {
        const updatedTask = {
            title: "Updated Task Title",
            description: "Updated Task Description",
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