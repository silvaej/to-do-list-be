import { Task } from '@src/models/Task'

export interface RetrievedTasksUseCaseIf {
    execute(): Promise<Array<Task>>
}
