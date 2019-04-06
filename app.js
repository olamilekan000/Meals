import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import logger from './src/config/winston'
import router from './src/routes/'
import PORT from './src/config/dev'
import { notFound } from './src/controllers/notFound'
import './src/helpers/checkEnv'

const BASE_URI = '/api/v1'

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(BASE_URI, router)

app.post(`${BASE_URI}/*`, notFound.retrunNotFound)
app.put(`${BASE_URI}/*`, notFound.retrunNotFound)
app.delete(`${BASE_URI}/*`, notFound.retrunNotFound)

app.get(`${BASE_URI}/`, (req, res) => {
	return res.status(200).json({
		message: "Hey! Meal's ready!!"
	})
})

app.use((err, req, res) => {
	res.status(500).json({
		message: 'server error',
		error: err
	})
})

app.listen(PORT, () => {
	logger.info(`Server now listening for request at port ${PORT}`)
})

export default app
