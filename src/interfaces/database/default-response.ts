import { Task } from '@src/models/Task'

export interface DefaultResponse<T extends Task | Array<Task>> {
    acknowledged: boolean
    data: T | null
    error: string | null
}
