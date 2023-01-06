import {
    AddTaskUseCaseIf,
    DeleteTaskUseCaseIf,
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
    update: UpdateTaskUseCaseIf
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
            const { _id, name, description, status } = req.body
            await add.execute({ _id, name, description, status })
            res.status(201).end()
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { _id, name, description, status } = req.body
            await update.execute(id, { _id, name, description, status })
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
