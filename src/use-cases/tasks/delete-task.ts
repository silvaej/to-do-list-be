import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { DeleteTaskUseCaseIf } from '@src/interfaces/use-cases/tasks'

export class DeleteTaskUseCase implements DeleteTaskUseCaseIf {
    constructor(private repository: TaskRepositoryIf) {}

    async execute(id: string): Promise<void> {
        const result = await this.repository.deleteTask(id)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
