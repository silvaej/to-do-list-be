import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { RetrievedTasksUseCaseIf } from '@src/interfaces/use-cases/tasks'
import { Task } from '@src/models/Task'

export class RetrieveTasksUseCase implements RetrievedTasksUseCaseIf {
    constructor(private repository: TaskRepositoryIf) {}

    async execute(project_id: string): Promise<Array<Task>> {
        const result = await this.repository.retrieveTasks(project_id)
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data!
    }
}
