const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('../routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

describe('Server API Tests', () => {
    it('should return 200 on GET /api/tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should create a new task on POST /api/tasks', async () => {
        const newTask = {
            title: "Test Task",
            description: "Task for testing server",
            status: "pending"
        };
        const res = await request(app).post('/api/tasks').send(newTask);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(newTask.title);
    });

    it('should return a specific task on GET /api/tasks/:id', async () => {
        const res = await request(app).get('/api/tasks/1');
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
        }
    });

    it('should update a task on PUT /api/tasks/:id', async () => {
        const updatedTask = {
            title: "Updated Test Task",
            description: "Updated task description",
            status: "completed"
        };
        const res = await request(app).put('/api/tasks/1').send(updatedTask);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe(updatedTask.title);
        }
    });

    it('should delete a task on DELETE /api/tasks/:id', async () => {
        const res = await request(app).delete('/api/tasks/1');
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error');
        } else {
            expect(res.statusCode).toBe(204);
        }
    });
});