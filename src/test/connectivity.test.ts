import request from 'supertest'
import { getServer } from '../index'

describe('GET /', () => {
    it('should return status 200 and a message', async () => {
        const server = await getServer()
        const res = await request(server).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({ message: 'Thank you for using the TO-DO-LIST API!' })
    })
})
