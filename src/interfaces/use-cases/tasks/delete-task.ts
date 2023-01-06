import { Task } from '@src/models/Task'

export interface DeleteTaskUseCaseIf {
    execute(id: string): Promise<void>
}
