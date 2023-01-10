import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { UpdateProjectUseCaseIf } from '@src/interfaces/use-cases/projects'
import { Project } from '@src/models/Project'

export class UpdateProjectUseCase implements UpdateProjectUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(id: string, update: Project, type: 'push' | 'update'): Promise<void> {
        const result = await this.repository.updateProject(id, update, type)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
