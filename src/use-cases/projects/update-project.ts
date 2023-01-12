import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { UpdateProjectUseCaseIf } from '@src/interfaces/use-cases/projects'
import { Project } from '@src/models/Project'

export class UpdateProjectUseCase implements UpdateProjectUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(id: string, update?: object, push?: object, increase?: object): Promise<void> {
        if (!update) update = {}
        if (!push) push = {}
        if (!increase) increase = {}
        const result = await this.repository.updateProject(id, update, push, increase)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
