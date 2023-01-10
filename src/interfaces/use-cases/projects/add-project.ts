import { Project } from '@src/models/Project'

export interface AddProjectUseCaseIf {
    execute(project: Project): Promise<string | null>
}
