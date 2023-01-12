import { TaskRepository } from './repositories/task-repository'
import { createTaskRouter } from './routers/task-router'
import {
    AddTaskUseCase,
    DeleteTaskUseCase,
    GroupTaskUseCase,
    RetrieveTasksUseCase,
    RetrieveTaskUseCase,
    UpdateTaskUseCase,
} from './use-cases/tasks'
import { Logger } from './utils/logger'
import server from './server'
import { MongoDbDataSource } from './data/sources/mongodb-data-source'
import { MongoDB, getDbConnection } from './data/connections/mongodb-connection'
import { ProjectRepository } from './repositories/project-repository'
import { createProjectRouter } from './routers/project-router'
import {
    AddProjectUseCase,
    DeleteProjectUseCase,
    RetrieveProjectsUseCase,
    RetrieveProjectUseCase,
    UpdateProjectUseCase,
} from './use-cases/projects'

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
        const tasksSource = new MongoDbDataSource(new MongoDB(db, 'TASKS'))
        const tasksRepo = new TaskRepository(tasksSource)
        const tasksRoute = createTaskRouter(
            new AddTaskUseCase(tasksRepo),
            new RetrieveTaskUseCase(tasksRepo),
            new RetrieveTasksUseCase(tasksRepo),
            new DeleteTaskUseCase(tasksRepo),
            new UpdateTaskUseCase(tasksRepo),
            new GroupTaskUseCase(tasksRepo)
        )
        server.use('/tasks', tasksRoute)

        const projectSource = new MongoDbDataSource(new MongoDB(db, 'PROJECTS'))
        const projectRepo = new ProjectRepository(projectSource)
        const projectRoute = createProjectRouter(
            new AddProjectUseCase(projectRepo),
            new RetrieveProjectUseCase(projectRepo),
            new RetrieveProjectsUseCase(projectRepo),
            new DeleteProjectUseCase(projectRepo),
            new UpdateProjectUseCase(projectRepo)
        )
        server.use('/projects', projectRoute)
    }

    /** ESTABLISHING HTTP CONNECTION */
    server.get('/', (req, res) => res.status(200).json({ message: 'Thank you for using the TO-DO-LIST API!' }))

    if (NODE_ENV !== 'test') server.listen(8080, () => console.log('Server running at localhost:8080'))

    return server
}

getServer()
