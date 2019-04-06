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

app.get(`${BASE_URI}`, (req, res) => {
	return res.status(200).json({
		message: "Hey! Meal's ready!!"
	})
})

app.use(BASE_URI, router)

app.post(`${BASE_URI}/*`, notFound.returnNotFound)
app.put(`${BASE_URI}/*`, notFound.returnNotFound)
app.delete(`${BASE_URI}/*`, notFound.returnNotFound)

app.use((err, req, res) => {
	res.status(500).json({
		message: 'server error',
		error: err
	})
})

app.get(`/`, (req, res) => {
	return res.status(200).json({
		message: "Base url is => /api/v1"
	})
})

app.listen(PORT, () => {
	logger.info(`Server now listening for request at port ${PORT}`)
})

export default app
