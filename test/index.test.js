import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'

chai.use(chaiHttp)

const should = chai.should()
const { expect } = chai
const BASE_URL = '/api/v1'

const data = {"mealIds":[52772, 52770, 52771, 52775]}
const badData = {"mealIds":[]}

describe('tests for meal app', () => {

	describe('Not found requests', () => {

		it('returns a not found response when requests is made to a non exitsing route: GET', (done) => {
			chai.request(app)
				.get(`${BASE_URL}/meal`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(404)
					res.type.should.eql('application/json')
					should.exist(res.body.message)
					should.exist(res.body.error)
					res.body.message.should.eql(`The resource doesn't exist`)
					res.body.error.should.eql(`Not found!`)
					done()
				})
		})		

		it('returns a not found response when requests is made to a non exitsing route: POST', (done) => {
			chai.request(app)
				.post(`${BASE_URL}/meal`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(404)
					res.type.should.eql('application/json')
					should.exist(res.body.message)
					should.exist(res.body.error)
					res.body.message.should.eql(`The resource doesn't exist`)
					res.body.error.should.eql(`Not found!`)
					done()
				})
		})

		it('returns a not found response when requests is made to a non exitsing route: PUT', (done) => {
			chai.request(app)
				.put(`${BASE_URL}/meal`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(404)
					res.type.should.eql('application/json')
					should.exist(res.body.message)
					should.exist(res.body.error)
					res.body.message.should.eql(`The resource doesn't exist`)
					res.body.error.should.eql(`Not found!`)
					done()
				})
		})

		it('returns a not found response when requests is made to a non exitsing route: DELETE', (done) => {
			chai.request(app)
				.delete(`${BASE_URL}/meal`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(404)
					res.type.should.eql('application/json')
					should.exist(res.body.message)
					should.exist(res.body.error)
					res.body.message.should.eql(`The resource doesn't exist`)
					res.body.error.should.eql(`Not found!`)
					done()
				})
		})
	})

	describe('gets all food categories', () => {
		it('gets all the food categories', done => {
			chai.request(app)
				.get(`${BASE_URL}/meals`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(200)
					res.type.should.eql('application/json')
					expect(res.body.data).to.be.an('array')
					should.exist(res.body.data[0].idCategory)
					should.exist(res.body.data[0].strCategory)
					should.exist(res.body.data[0].strCategoryThumb)
					should.exist(res.body.data[0].strCategoryDescription)
					done()
				})
		})
	})

	describe('returns the meal with the leats ingredients', () => {
		it('retuns the meal with the leat ingredients', done => {
			chai.request(app)
				.post(`${BASE_URL}/meals`)
				.send(data)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(200)
					res.type.should.eql('application/json')
					expect(res.body.leastIngredientMeal).to.be.an('array')
					should.exist(res.body.leastIngredientMeal[0].idMeal)
					should.exist(res.body.leastIngredientMeal[0].strMeal)
					should.exist(res.body.leastIngredientMeal[0].strCategory)
					should.exist(res.body.leastIngredientMeal[0].strArea)
					should.exist(res.body.leastIngredientMeal[0].strInstructions)
					should.exist(res.body.leastIngredientMeal[0].strMealThumb)
					should.exist(res.body.leastIngredientMeal[0].strTags)
					should.exist(res.body.leastIngredientMeal[0].strYoutube)
					should.exist(res.body.leastIngredientMeal[0].strIngredient1)
					should.exist(res.body.leastIngredientMeal[0].strMealThumb)
					should.exist(res.body.leastIngredientMeal[0].strIngredient1)
					should.exist(res.body.leastIngredientMeal[0].strIngredient2)
					should.exist(res.body.leastIngredientMeal[0].strIngredient3)
					should.exist(res.body.leastIngredientMeal[0].strIngredient4)
					should.exist(res.body.leastIngredientMeal[0].strIngredient5)
					should.exist(res.body.leastIngredientMeal[0].strIngredient6)
					should.exist(res.body.leastIngredientMeal[0].strIngredient7)
					should.exist(res.body.leastIngredientMeal[0].strIngredient8)
					should.exist(res.body.leastIngredientMeal[0].strIngredient9)
					should.exist(res.body.leastIngredientMeal[0].strIngredient10)
					should.exist(res.body.leastIngredientMeal[0].strIngredient11)
					should.exist(res.body.leastIngredientMeal[0].strIngredient12)
					should.exist(res.body.leastIngredientMeal[0].strIngredient13)
					should.exist(res.body.leastIngredientMeal[0].strIngredient14)
					should.exist(res.body.leastIngredientMeal[0].strIngredient15)
					res.body.leastIngredientMeal[0].idMeal.should.eql('52771')
					res.body.leastIngredientMeal[0].strMeal.should.eql('Spicy Arrabiata Penne')
					res.body.leastIngredientMeal[0].strCategory.should.eql('Vegetarian')
					res.body.leastIngredientMeal[0].strArea.should.eql('Italian')
					done()
				})
		})
	})

	describe('returns an error message when the req object is bad', () => {
		it('returns an error message when the req object is bad', done => {
			chai.request(app)
				.post(`${BASE_URL}/meals`)
				.send(badData)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(400)
					res.type.should.eql('application/json')
					should.exist(res.body.error)
					res.body.error.should.eql('Bad input format!')
					done()
				})
		})
	})

	describe('returns a messge to show that the application has started', () => {
		it('returns a message the applicatio is now live', done => {
			chai.request(app)
				.get(`${BASE_URL}/`)
				.set('content-type', 'application/json')
				.end((err, res) => {
					res.should.have.status(200)
					res.type.should.eql('application/json')
					should.exist(res.body.message)
					res.body.message.should.eql('Hey! Meal\'s ready!!')
					done()
				})
		})
	})					

})
