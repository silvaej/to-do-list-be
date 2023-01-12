import { GroupedTaskSummary, Project } from '@src/models/Project'
import { Task } from '@src/models/Task'

export interface DefaultResponse<
    T extends Task | Array<Task> | Project | Array<Project> | GroupedTaskSummary | Array<GroupedTaskSummary>
> {
    acknowledged: boolean
    data: T | null
    error: string | null
}

export interface IdResponse {
    acknowledged: boolean
    data: string | null
    error: string | null
}
