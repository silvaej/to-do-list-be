import { Project } from '@src/models/Project'

export interface RetrievedProjectsUseCaseIf {
    execute(): Promise<Array<Project>>
}
