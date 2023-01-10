export interface DeleteTaskUseCaseIf {
    execute(id: string): Promise<void>
}
