
export class notFound {
	static returnNotFound(req, res, next){
		res.status(404).json({
			message: `The resource doesn't exist`,
			error: 'Not found!'
		})
	}
}
