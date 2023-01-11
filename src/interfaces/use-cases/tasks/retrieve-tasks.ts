import { Task } from '@src/models/Task'

export interface RetrievedTasksUseCaseIf {
    execute(project_id: string): Promise<Array<Task>>
}
