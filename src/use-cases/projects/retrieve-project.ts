import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { RetrievedProjectUseCaseIf } from '@src/interfaces/use-cases/projects'
import { Project } from '@src/models/Project'

export class RetrieveProjectUseCase implements RetrievedProjectUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(id: string): Promise<Project> {
        const result = await this.repository.retrieveProject(id)
        if (!result.acknowledged || !(result.data instanceof Array)) throw new Error(result.error!)
        return result.data[0]
    }
}
