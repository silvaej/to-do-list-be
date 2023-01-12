import {
    AddProjectUseCaseIf,
    DeleteProjectUseCaseIf,
    RetrievedProjectUseCaseIf,
    RetrievedProjectsUseCaseIf,
    UpdateProjectUseCaseIf,
} from '@src/interfaces/use-cases/projects'
import { Request, Response, Router } from 'express'
import { type } from 'os'

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
            const result = await add.execute({
                test_id,
                title,
                description,
                total_number_of_tasks: 0,
                number_of_tasks_done: 0,
            })
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
            const { tasks, ...rest } = req.body
            const push = tasks ? { tasks } : {}
            const query = { ...rest }
            await update.execute(id, query, push)
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.put('/:id/editTotal/:increase', async (req: Request, res: Response) => {
        try {
            const { id, increase } = req.params
            const query = { total_number_of_tasks: Number(increase) }
            await update.execute(id, undefined, undefined, query)
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) res.status(500).json({ error: err.message })
        }
    })

    router.put('/:id/editDone/:increase', async (req: Request, res: Response) => {
        try {
            const { id, increase } = req.params
            const query = { number_of_tasks_done: Number(increase) }
            await update.execute(id, undefined, undefined, query)
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
