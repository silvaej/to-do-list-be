import request from 'supertest'
import { Express } from 'express'
import { getServer } from '../index'

let server: Express

beforeAll(async () => {
    server = await getServer()
})

describe('POST /tasks', () => {
    it('should return status 201', async () => {
        const payload = {
            test_id: 'test-001',
            project_id: 'test_project',
            name: 'TEST_0001',
            description: 'Some description :)))',
            status: 'TO_DO',
        }
        const res = await request(server).post('/tasks').send(payload)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
    })
})

describe('GET /tasks', () => {
    it('should return status 200 and expect an array of TASKS', async () => {
        const res = await request(server).get('/tasks').query({ project_id: 'test_project' })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe('GET /tasks/:id', () => {
    it('should return status 200 and receive an instance of task', async () => {
        const res = await request(server).get('/tasks/test-001')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('test_id', 'test-001')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('status')
    })
})

describe('PUT /tasks/:id', () => {
    it('should return status 204', async () => {
        const payload = {
            name: 'TEST_0001-EDITED',
            description: 'Some description :)))',
            status: 'TO_DO',
        }
        const res = await request(server).put('/tasks/test-001').send(payload)
        expect(res.statusCode).toEqual(204)
    })
})

describe('DELETE /tasks/:id', () => {
    it('should return status 204', async () => {
        const res = await request(server).delete('/tasks/test-001')
        expect(res.statusCode).toEqual(204)
    })
})
