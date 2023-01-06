import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { UpdateTaskUseCaseIf } from '@src/interfaces/use-cases/tasks'
import { Task } from '@src/models/Task'

export class UpdateTaskUseCase implements UpdateTaskUseCaseIf {
    constructor(private repository: TaskRepositoryIf) {}

    async execute(id: string, update: Task): Promise<void> {
        const result = await this.repository.updateTask(id, update)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
