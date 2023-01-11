import { Task } from '@src/models/Task'
import { DefaultResponse, IdResponse } from '../database/default-response'

export interface TaskRepositoryIf {
    addTask(task: Task): Promise<IdResponse>
    retrieveTask(id: string): Promise<DefaultResponse<Task>>
    retrieveTasks(project_id: string): Promise<DefaultResponse<Array<Task>>>
    updateTask(id: string, update: Task): Promise<DefaultResponse<Task>>
    deleteTask(id: string): Promise<DefaultResponse<Task>>
}
