import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse } from '@src/interfaces/database/default-response'
import { MongoDbWrapper } from '@src/interfaces/database/mongodb-wrapper'
import { Task } from '@src/models/Task'

export class MongoDbDataSource implements DataSource {
    constructor(private db: MongoDbWrapper) {}

    async find<T extends Task | Task[]>(id?: string | undefined): Promise<DefaultResponse<T>> {
        const result = await this.db.find(id)
        return { acknowledged: true, data: result as T, error: null }
    }

    async insertOne<T extends Task>(doc: T): Promise<DefaultResponse<Task>> {
        const { acknowledged } = await this.db.insert(doc)
        return {
            acknowledged,
            data: null,
            error: acknowledged ? null : 'Something went wrong',
        }
    }

    async findOneByIdAndUpdate<T extends Task>(id: string, update: T): Promise<DefaultResponse<T>> {
        const { acknowledged, matchedCount } = await this.db.update(id, { $set: update })
        let response: DefaultResponse<T> = {
            acknowledged: false,
            data: null,
            error: null,
        }
        if (!acknowledged) {
            response.error = 'Something went wrong'
            return response
        }
        if (matchedCount === 0) {
            response.error = 'NotFound'
            return response
        }

        response.acknowledged = true
        return response
    }

    async findOneByIdAndDelete<T extends Task>(id: string): Promise<DefaultResponse<T>> {
        const { acknowledged, deletedCount } = await this.db.delete(id)
        return {
            acknowledged: acknowledged && !!deletedCount,
            data: null,
            error: acknowledged && !!deletedCount ? null : 'NotFound',
        }
    }
}
