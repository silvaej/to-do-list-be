import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { RetrievedProjectsUseCaseIf } from '@src/interfaces/use-cases/projects'
import { Project } from '@src/models/Project'

export class RetrieveProjectsUseCase implements RetrievedProjectsUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(): Promise<Array<Project>> {
        const result = await this.repository.retrieveProjects()
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data!
    }
}
