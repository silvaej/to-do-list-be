import { Task } from '@src/models/Task'

export interface InsertResult {
    acknowledged: boolean
}

export interface DeleteResult extends InsertResult {
    deletedCount: number
}

export interface UpdateResult extends InsertResult {
    matchedCount: number
}

export interface MockDbWrapper {
    find(id?: string): Promise<Array<any>>
    insert(doc: Task): Promise<InsertResult>
    delete(id: string): Promise<DeleteResult>
    update(id: string, data: Task): Promise<UpdateResult>
}
