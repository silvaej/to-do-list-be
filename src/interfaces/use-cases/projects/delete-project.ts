export interface DeleteProjectUseCaseIf {
    execute(id: string): Promise<void>
}
