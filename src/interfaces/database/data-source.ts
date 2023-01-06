import { Task } from '@src/models/Task'
import { DefaultResponse } from './default-response'

export interface DataSource {
    find<T extends Task | Array<Task>>(id: string): Promise<DefaultResponse<T>>
    insertOne<T extends Task>(doc: T): Promise<DefaultResponse<Task>>
    findOneByIdAndUpdate<T extends Task>(id: string, update: T): Promise<DefaultResponse<T>>
    findOneByIdAndDelete<T extends Task>(id: string): Promise<DefaultResponse<T>>
}
