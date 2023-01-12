import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse, IdResponse } from '@src/interfaces/database/default-response'
import { MongoDbWrapper } from '@src/interfaces/database/mongodb-wrapper'
import { GroupedTaskSummary, Project } from '@src/models/Project'
import { Task } from '@src/models/Task'

export class MongoDbDataSource implements DataSource {
    constructor(private db: MongoDbWrapper) {}

    async find<T extends Task | Array<Task> | Project | Array<Project>>(
        id?: string,
        project_id?: string
    ): Promise<DefaultResponse<T>> {
        const result = await this.db.find(id, project_id)
        return { acknowledged: true, data: result as T, error: null }
    }

    async insertOne<T extends Task | Project>(doc: T): Promise<IdResponse> {
        const { acknowledged, insertedId } = await this.db.insert(doc)
        return {
            acknowledged,
            data: insertedId.toString(),
            error: acknowledged ? null : 'Something went wrong',
        }
    }

    async findOneByIdAndUpdate<T extends Task | Project>(id: string, update: object): Promise<DefaultResponse<T>> {
        const { acknowledged, matchedCount } = await this.db.update(id, update)
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

    async findOneByIdAndDelete<T extends Task | Project>(id: string): Promise<DefaultResponse<T>> {
        const { acknowledged, deletedCount } = await this.db.delete(id)
        return {
            acknowledged: acknowledged && !!deletedCount,
            data: null,
            error: acknowledged && !!deletedCount ? null : 'NotFound',
        }
    }

    async groupByProject<T extends GroupedTaskSummary>(): Promise<DefaultResponse<Array<T>>> {
        const pipeline = [
            {
                $group: {
                    _id: '$project_id',
                    to_do: {
                        $sum: { $cond: [{ $eq: ['$status', 'TO_DO'] }, 1, 0] },
                    },
                    in_progress: {
                        $sum: { $cond: [{ $eq: ['$status', 'IN_PROGRESS'] }, 1, 0] },
                    },
                    done: {
                        $sum: { $cond: [{ $eq: ['$status', 'DONE'] }, 1, 0] },
                    },
                },
            },
            {
                $project: {
                    total: { $sum: ['$to_do', '$in_progress', '$done'] },
                    total_done: '$done',
                },
            },
        ]

        const result = await this.db.aggregate(pipeline)

        return {
            acknowledged: true,
            data: result,
            error: null,
        }
    }
}
