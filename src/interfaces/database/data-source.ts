import { GroupedTaskSummary, Project } from '@src/models/Project'
import { Task } from '@src/models/Task'
import { DefaultResponse, IdResponse } from './default-response'

export interface DataSource {
    find<T extends Task | Array<Task> | Project | Array<Project>>(
        id?: string,
        project_id?: string
    ): Promise<DefaultResponse<T>>
    insertOne<T extends Task | Project>(doc: T): Promise<IdResponse>
    findOneByIdAndUpdate<T extends Task | Project>(id: string, update: object): Promise<DefaultResponse<T>>
    findOneByIdAndDelete<T extends Task | Project>(id: string): Promise<DefaultResponse<T>>
    groupByProject<T extends GroupedTaskSummary>(): Promise<DefaultResponse<Array<GroupedTaskSummary>>>
}
