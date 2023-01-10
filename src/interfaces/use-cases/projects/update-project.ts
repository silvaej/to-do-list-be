import { Project } from '@src/models/Project'

export interface UpdateProjectUseCaseIf {
    execute(id: string, update: Project, type: 'push' | 'update'): Promise<void>
}
