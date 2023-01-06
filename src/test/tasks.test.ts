import request from 'supertest'
import server from '../index'

describe('POST /tasks', () => {
    it('should return status 201', async () => {
        const payload = {
            _id: 'test-001',
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
        const res = await request(server).get('/tasks')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe('GET /tasks/:id', () => {
    it('should return status 200 and receive an instance of task', async () => {
        const res = await request(server).get('/tasks/test-001')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id', 'test-001')
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
