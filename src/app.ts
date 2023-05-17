import 'express-async-errors'
import express from 'express'
import { appRoutes } from './routes'
import { handleErrors } from './errors'

const app = express()

app.use(express.json())

appRoutes(app)

app.use(handleErrors)

export default app
