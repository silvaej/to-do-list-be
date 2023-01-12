import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse, IdResponse } from '@src/interfaces/database/default-response'
import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { Task } from '@src/models/Task'

export class TaskRepository implements TaskRepositoryIf {
    constructor(private source: DataSource) {}

    async addTask(task: Task): Promise<IdResponse> {
        return this.source.insertOne(task)
    }

    async retrieveTask(id: string): Promise<DefaultResponse<Task>> {
        return this.source.find(id)
    }

    async retrieveTasks(project_id: string): Promise<DefaultResponse<Array<Task>>> {
        return this.source.find(undefined, project_id)
    }

    async updateTask(id: string, update: object): Promise<DefaultResponse<Task>> {
        update = Object.fromEntries(Object.entries(update).filter(([_, v]) => v !== undefined && v !== null))
        return this.source.findOneByIdAndUpdate(id, { $set: update })
    }

    async deleteTask(id: string): Promise<DefaultResponse<Task>> {
        return this.source.findOneByIdAndDelete(id)
    }
}
