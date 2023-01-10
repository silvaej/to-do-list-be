import { Project } from '@src/models/Project'

export interface UpdateProjectUseCaseIf {
    execute(id: string, update: Project): Promise<void>
}
