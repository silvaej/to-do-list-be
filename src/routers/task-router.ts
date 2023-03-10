import {
    AddTaskUseCaseIf,
    DeleteTaskUseCaseIf,
    GroupTaskUseCaseIf,
    RetrievedTasksUseCaseIf,
    RetrievedTaskUseCaseIf,
    UpdateTaskUseCaseIf,
} from '@src/interfaces/use-cases/tasks'
import { Request, Response, Router } from 'express'

export function createTaskRouter(
    add: AddTaskUseCaseIf,
    retrieve: RetrievedTaskUseCaseIf,
    retrieveAll: RetrievedTasksUseCaseIf,
    remove: DeleteTaskUseCaseIf,
    update: UpdateTaskUseCaseIf,
    group: GroupTaskUseCaseIf
): Router {
    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const { project_id } = req.query
            if (project_id && typeof project_id === 'string') {
                const result = await retrieveAll.execute(project_id)
                res.status(200).json(result)
            }
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const result = await retrieve.execute(id)
            res.status(200).json(result)
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.get('/process/group', async (req: Request, res: Response) => {
        try {
            const result = await group.execute()
            res.status(200).json({ data: result })
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { test_id, project_id, name, description, status } = req.body
            const result = await add.execute({ test_id, project_id, name, description, status })
            if (result) {
                res.status(201).json({ id: result })
            }
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { test_id, project_id, name, description, status } = req.body
            await update.execute(id, { test_id, project_id, name, description, status })
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            await remove.execute(id)
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    return router
}
