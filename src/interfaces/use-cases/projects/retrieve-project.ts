import { Project } from '@src/models/Project'

export interface RetrievedProjectUseCaseIf {
    execute(id: string): Promise<Project>
}
