import { Task } from '@src/models/Task'

export interface UpdateTaskUseCaseIf {
    execute(id: string, update: Task): Promise<void>
}
