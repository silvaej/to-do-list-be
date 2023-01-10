import request from 'supertest'
import { Express } from 'express'
import { getServer } from '../index'

let server: Express

beforeAll(async () => {
    server = await getServer()
})

describe('POST /projects', () => {
    it('should return status 201 and an id', async () => {
        const payload = {
            test_id: 'test-001',
            title: 'PROJECT_TEST_001',
            description: 'Some description :)))',
        }
        const res = await request(server).post('/projects').send(payload)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
    })
})

describe('GET /projecs', () => {
    it('should return status 200 and expect an array of Projects', async () => {
        const res = await request(server).get('/projects')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe('GET /projects/:id', () => {
    it('should return status 200 and receive an instance of task', async () => {
        const res = await request(server).get('/projects/test-001')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('test_id', 'test-001')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('tasks', [])
        expect(res.body).toHaveProperty('dateCreated')
    })
})

describe('PUT /projects/:type/:id', () => {
    it('should return status 204', async () => {
        const payload = {
            title: 'PROJECT_TEST_001_EDITED',
        }
        const res = await request(server).put('/projects/update/test-001').send(payload)
        expect(res.statusCode).toEqual(204)
    })

    it('should return status 204', async () => {
        const payload = {
            tasks: '1239012834081',
        }
        const res = await request(server).put('/projects/push/test-001').send(payload)
        expect(res.statusCode).toEqual(204)
    })
})

describe('DELETE /projects/:id', () => {
    it('should return status 204', async () => {
        const res = await request(server).delete('/projects/test-001')
        expect(res.statusCode).toEqual(204)
    })
})
