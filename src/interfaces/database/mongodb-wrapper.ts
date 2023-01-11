import { Task } from '@src/models/Task'
import { DeleteResult, Document, InsertOneResult, UpdateResult } from 'mongodb'

export interface MongoDbWrapper {
    find(id?: string, project_id?: string): Promise<Array<any>>
    insert(doc: any): Promise<InsertOneResult<Document>>
    delete(id: string): Promise<DeleteResult>
    update(id: string, data: object): Promise<UpdateResult>
}
