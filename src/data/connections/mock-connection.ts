import { DeleteResult, InsertResult, MockDbWrapper, UpdateResult } from '@src/interfaces/database/mockdb-wrapper'
import { Task } from '@src/models/Task'
import { Logger } from '@src/utils/logger'
import fs from 'fs'

Logger.setLogger()

interface DB {
    collection: (name: string) => Array<Task>
}

class Db implements DB {
    private database: any
    constructor(data: Buffer) {
        this.database = JSON.parse(data.toString())
    }

    collection(name: string): Array<Task> {
        return this.database[name]
    }
}

export class MockDb implements MockDbWrapper {
    constructor(private db: DB, private collection: string) {}

    async find(id: string | undefined): Promise<Array<Task>> {
        if (id) {
            const result = this.db.collection(this.collection).filter(item => item._id === id)
            return result
        }
        return this.db.collection(this.collection)
    }

    async insert(doc: Task): Promise<InsertResult> {
        const updated = [...this.db.collection(this.collection), doc]
        return new Promise((resolve, reject) => {
            fs.writeFile('../mock/db.json', JSON.stringify(updated), err => {
                if (err) reject({ acknowledged: false })
                resolve({ acknowledged: true })
            })
        })
    }

    async delete(id: string): Promise<DeleteResult> {
        const updated = this.db.collection(this.collection).filter(item => item._id !== id)

        return new Promise((resolve, reject) => {
            fs.writeFile('../mock/db.json', JSON.stringify(updated), err => {
                if (err || !updated.length) reject({ acknowledged: false, deletedCount: 0 })
                resolve({ acknowledged: true, deletedCount: updated.length })
            })
        })
    }

    async update(id: string, data: Task): Promise<UpdateResult> {
        const updated = this.db.collection(this.collection).map(item => (item._id === id ? { ...item, ...data } : item))

        return new Promise((resolve, reject) => {
            fs.writeFile('../mock/db.json', JSON.stringify(updated), err => {
                if (err || !updated.length) reject({ acknowledged: false, matchedCount: 0 })
                resolve({ acknowledged: true, matchedCount: updated.length })
            })
        })
    }
}

export async function getDbConnection(): Promise<DB> {
    return new Promise((resolve, reject) => {
        fs.readFile('../mock/db.json', (err, data) => {
            if (err) reject(err)
            Logger.log('info', 'Connected to the database')
            resolve(new Db(data))
        })
    })
}
