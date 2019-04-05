
export class notFound {
	static retrunNotFound(req, res){
		res.status(404).json({
			message: `The resource doesn't exist`,
			error: 'Not found!'
		})
	}
}
