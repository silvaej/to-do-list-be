export interface Project {
    _id?: string // available only on response
    test_id?: string // only required for testing
    title: string
    description: string
    tasks?: Array<string> // available only on response
    dateCreated?: Date // automatically generated
    total_number_of_tasks: number
    number_of_tasks_done: number
}

export interface GroupedTaskSummary {
    _id: string
    total: number
    total_done: number
}
