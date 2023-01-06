import { Task } from '@src/models/Task'

export interface AddTaskUseCaseIf {
    execute(task: Task): Promise<void>
}
