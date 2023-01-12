import { Project } from '@src/models/Project'

export interface UpdateProjectUseCaseIf {
    execute(id: string, update?: object, push?: object, increase?: object): Promise<void>
}
