import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse, IdResponse } from '@src/interfaces/database/default-response'
import { ProjectRepositoryIf } from '@src/interfaces/repositories/project-repository'
import { Project } from '@src/models/Project'

export class ProjectRepository implements ProjectRepositoryIf {
    constructor(private source: DataSource) {}

    async addProject(project: Project): Promise<IdResponse> {
        return this.source.insertOne(project)
    }

    async retrieveProject(id: string): Promise<DefaultResponse<Project>> {
        return this.source.find(id)
    }

    async retrieveProjects(): Promise<DefaultResponse<Project[]>> {
        return this.source.find()
    }

    async updateProject(id: string, update: Project, type: 'push' | 'update'): Promise<DefaultResponse<Project>> {
        return this.source.findOneByIdAndUpdate(id, update, type)
    }

    async deleteProject(id: string): Promise<DefaultResponse<Project>> {
        return this.source.findOneByIdAndDelete(id)
    }
}
