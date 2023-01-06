import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { AddTaskUseCaseIf } from '@src/interfaces/use-cases/tasks'
import { Task } from '@src/models/Task'

export class AddTaskUseCase implements AddTaskUseCaseIf {
    constructor(private repository: TaskRepositoryIf) {}

    async execute(task: Task): Promise<void> {
        const result = await this.repository.addTask(task)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
