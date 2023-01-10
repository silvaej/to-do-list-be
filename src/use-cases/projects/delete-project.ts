import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { DeleteProjectUseCaseIf } from '@src/interfaces/use-cases/projects'

export class DeleteProjectUseCase implements DeleteProjectUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(id: string): Promise<void> {
        const result = await this.repository.deleteProject(id)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
