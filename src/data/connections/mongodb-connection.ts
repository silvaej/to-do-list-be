import { MongoDbWrapper } from '@src/interfaces/database/mongodb-wrapper'
import { Db, Document, InsertOneResult, MongoClient, DeleteResult, ObjectId, UpdateResult } from 'mongodb'
import dotenv from 'dotenv'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
    dotenv.config()
}

export class MongoDB implements MongoDbWrapper {
    constructor(private db: Db, private collection: string) {}

    async find(id?: string, project_id?: string): Promise<Array<any>> {
        let query = {}
        if (id) {
            if (process.env.NODE_ENV === 'test') query = { test_id: id }
            else query = { _id: new ObjectId(id) }
        }

        if (project_id) {
            query = { ...query, project_id }
        }

        const results = await this.db.collection(this.collection).find(query).toArray()
        return results
    }

    async insert(doc: any): Promise<InsertOneResult<Document>> {
        doc = Object.fromEntries(Object.entries(doc).filter(([_, v]) => v !== undefined && v !== null))
        return await this.db.collection(this.collection).insertOne(doc)
    }

    async delete(id: string): Promise<DeleteResult> {
        let query = {}
        if (process.env.NODE_ENV === 'test') query = { test_id: id }
        else query = { _id: new ObjectId(id) }
        return await this.db.collection(this.collection).deleteOne(query)
    }

    async update(id: string, update: object): Promise<UpdateResult> {
        let query = {}
        if (process.env.NODE_ENV === 'test') query = { test_id: id }
        else query = { _id: new ObjectId(id) }
        const res = await this.db.collection(this.collection).updateOne(query, update)
        return res
    }
}

export async function getDbConnection(): Promise<Db> {
    const client: MongoClient = new MongoClient(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_SECRET}@todo-db-v1.uhecg4p.mongodb.net/?retryWrites=true&w=majority`
    )

    await client.connect()
    const db = client.db(process.env.NODE_ENV || 'TEST')
    return db
}
