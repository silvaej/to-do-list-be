import {
    AddProjectUseCaseIf,
    DeleteProjectUseCaseIf,
    RetrievedProjectUseCaseIf,
    RetrievedProjectsUseCaseIf,
    UpdateProjectUseCaseIf,
} from '@src/interfaces/use-cases/projects'
import { Request, Response, Router } from 'express'

export function createProjectRouter(
    add: AddProjectUseCaseIf,
    retrieve: RetrievedProjectUseCaseIf,
    retrieveAll: RetrievedProjectsUseCaseIf,
    remove: DeleteProjectUseCaseIf,
    update: UpdateProjectUseCaseIf
): Router {
    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const result = await retrieveAll.execute()
            res.status(200).json(result)
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

    router.post('/', async (req: Request, res: Response) => {
        try {
            const { test_id, title, description } = req.body
            const result = await add.execute({ test_id, title, description })
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
            const { test_id, title, description, tasks } = req.body
            await update.execute(id, { test_id, title, description, tasks })
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
