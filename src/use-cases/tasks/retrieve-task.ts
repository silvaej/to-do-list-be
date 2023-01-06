import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { RetrievedTaskUseCaseIf } from '@src/interfaces/use-cases/tasks'
import { Task } from '@src/models/Task'

export class RetrieveTaskUseCase implements RetrievedTaskUseCaseIf {
    constructor(private repository: TaskRepositoryIf) {}

    async execute(id: string): Promise<Task> {
        const result = await this.repository.retrieveTask(id)
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data!
    }
}
