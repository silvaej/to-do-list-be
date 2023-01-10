import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { AddProjectUseCaseIf } from '@src/interfaces/use-cases/projects'
import { Project } from '@src/models/Project'

export class AddProjectUseCase implements AddProjectUseCaseIf {
    constructor(private repository: ProjectRepositoryIf) {}

    async execute(project: Project): Promise<string | null> {
        project = { ...project, dateCreated: new Date(), tasks: [] }
        const { acknowledged, data, error } = await this.repository.addProject(project)

        if (!acknowledged) throw new Error(error!)
        return data
    }
}
