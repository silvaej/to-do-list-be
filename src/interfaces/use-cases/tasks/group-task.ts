import { GroupedTaskSummary } from '@src/models/Project'

export interface GroupTaskUseCaseIf {
    execute(): Promise<Array<GroupedTaskSummary>>
}
