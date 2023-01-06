import express from 'express'
import cors from 'cors'
import { getDbConnection, MockDb } from './data/connections/mock-connection'
import { MockDbDataSource } from './data/sources/mockdb-data-source'
import { TaskRepository } from './repositories/task-repository'
import { createTaskRouter } from './routers/task-router'
import {
    AddTaskUseCase,
    DeleteTaskUseCase,
    RetrieveTasksUseCase,
    RetrieveTaskUseCase,
    UpdateTaskUseCase,
} from './use-cases/tasks'
import { Logger } from './utils/logger'
import server from './server'

const NODE_ENV = process.env.NODE_ENV || 'test'

Logger.setLogger()

server.use(Logger.httpLogger())
export async function getServer() {
    let db
    try {
        db = await getDbConnection()
    } catch (err) {
        if (err instanceof Error) console.error(err.message)
    }

    if (db) {
        const tasksSource = new MockDbDataSource(new MockDb(db, 'TASKS'))
        const tasksRepo = new TaskRepository(tasksSource)
        const tasksRoute = createTaskRouter(
            new AddTaskUseCase(tasksRepo),
            new RetrieveTaskUseCase(tasksRepo),
            new RetrieveTasksUseCase(tasksRepo),
            new DeleteTaskUseCase(tasksRepo),
            new UpdateTaskUseCase(tasksRepo)
        )
        server.use('/tasks', tasksRoute)
    }

    /** ESTABLISHING HTTP CONNECTION */
    server.get('/', (req, res) => res.status(200).json({ message: 'Thank you for using the TO-DO-LIST API!' }))

    if (NODE_ENV !== 'test') server.listen(8080, () => console.log('Server running at localhost:8080'))

    return server
}

getServer()
