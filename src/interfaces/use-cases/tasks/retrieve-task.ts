import { Task } from '@src/models/Task'

export interface RetrievedTaskUseCaseIf {
    execute(id: string): Promise<Task>
}
