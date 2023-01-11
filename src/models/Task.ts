export interface Task {
    _id?: string
    test_id?: string
    project_id: string
    name: string
    description: string
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'
}
