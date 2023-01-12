import { Project } from '@src/models/Project'
import { DefaultResponse, IdResponse } from '../database/default-response'

export interface ProjectRepositoryIf {
    addProject(project: Project): Promise<IdResponse>
    retrieveProject(id: string): Promise<DefaultResponse<Project>>
    retrieveProjects(): Promise<DefaultResponse<Array<Project>>>
    updateProject(id: string, update: object, push: object, increase: object): Promise<DefaultResponse<Project>>
    deleteProject(id: string): Promise<DefaultResponse<Project>>
}
