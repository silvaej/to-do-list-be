import { Task } from '@src/models/Task'
import { DefaultResponse } from '../database/default-response'

export interface TaskRepositoryIf {
    addTask(task: Task): Promise<DefaultResponse<Task>>
    retrieveTask(id: string): Promise<DefaultResponse<Task>>
    retrieveTasks(): Promise<DefaultResponse<Array<Task>>>
    updateTask(id: string, update: Task): Promise<DefaultResponse<Task>>
    deleteTask(id: string): Promise<DefaultResponse<Task>>
}
