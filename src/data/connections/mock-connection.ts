import { DeleteResult, InsertResult, MockDbWrapper, UpdateResult } from '@src/interfaces/database/mockdb-wrapper'
import { Task } from '@src/models/Task'
import fs from 'fs'

interface DB {
    database: any
    collection: (name: string) => Array<Task>
}

class Db implements DB {
    public database: any
    constructor(data: any) {
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
        const updateDatabase = { ...this.db.database, [this.collection]: updated }
        return new Promise((resolve, reject) => {
            fs.writeFile('./__mock__/db.json', JSON.stringify(updateDatabase), err => {
                if (err) reject({ acknowledged: false })
                resolve({ acknowledged: true })
            })
        })
    }

    async delete(id: string): Promise<DeleteResult> {
        const updated = this.db.collection(this.collection).filter(item => item._id !== id)
        const updateDatabase = { ...this.db.database, [this.collection]: updated }

        return new Promise((resolve, reject) => {
            fs.writeFile('./__mock__/db.json', JSON.stringify(updateDatabase), err => {
                if (err || !updated.length) reject({ acknowledged: false, deletedCount: 0 })
                resolve({ acknowledged: true, deletedCount: updated.length })
            })
        })
    }

    async update(id: string, data: Task): Promise<UpdateResult> {
        const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => !!v))
        const updated = this.db
            .collection(this.collection)
            .map(item => (item._id === id ? { ...item, ...cleanData } : item))
        const updateDatabase = { ...this.db.database, [this.collection]: updated }

        return new Promise((resolve, reject) => {
            fs.writeFile('./__mock__/db.json', JSON.stringify(updateDatabase), err => {
                if (err || !updated.length) reject({ acknowledged: false, matchedCount: 0 })
                resolve({ acknowledged: true, matchedCount: updated.length })
            })
        })
    }
}

export async function getDbConnection(): Promise<DB> {
    return new Promise((resolve, reject) => {
        fs.readFile('./__mock__/db.json', (err, data) => {
            if (err) reject(err)
            resolve(new Db(data))
        })
    })
}
