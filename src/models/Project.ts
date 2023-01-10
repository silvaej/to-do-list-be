export interface Project {
    _id?: string // available only on response
    test_id?: string // only required for testing
    title: string
    description: string
    tasks?: Array<string> // available only on response
    dateCreated?: Date // automatically generated
    $push?: Array<string> // used to push items to tasks
}
