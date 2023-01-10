import { Task } from '@src/models/Task'

export interface DefaultResponse<T extends Task | Array<Task>> {
    acknowledged: boolean
    data: T | null
    error: string | null
}

export interface IdResponse {
    acknowledged: boolean
    data: string | null
    error: string | null
}
