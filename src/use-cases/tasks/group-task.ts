import { TaskRepositoryIf } from '@src/interfaces/repositories/task-repository'
import { GroupTaskUseCaseIf } from '@src/interfaces/use-cases/tasks'
import { GroupedTaskSummary } from '@src/models/Project'

export class GroupTaskUseCase implements GroupTaskUseCaseIf {
    constructor(private reposity: TaskRepositoryIf) {}

    async execute(): Promise<GroupedTaskSummary[]> {
        const { acknowledged, data, error } = await this.reposity.groupTask()
        if (!acknowledged) throw new Error(error!)
        return data!
    }
}
