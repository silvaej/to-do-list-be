import request from 'supertest'

import { getServer } from '../index'

describe('POST /tasks', () => {
    it('should return status 201', async () => {
        const server = await getServer()
        const payload = {
            test_id: 'test-001',
            name: 'TEST_0001',
            description: 'Some description :)))',
            status: 'TO_DO',
        }
        const res = await request(server).post('/tasks').send(payload)
        expect(res.statusCode).toEqual(201)
    })
})

describe('GET /tasks', () => {
    it('should return status 200 and expect an array of TASKS', async () => {
        const server = await getServer()
        const res = await request(server).get('/tasks')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe('GET /tasks/:id', () => {
    it('should return status 200 and receive an instance of task', async () => {
        const server = await getServer()
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
        const server = await getServer()
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
        const server = await getServer()
        const res = await request(server).delete('/tasks/test-001')
        expect(res.statusCode).toEqual(204)
    })
})
