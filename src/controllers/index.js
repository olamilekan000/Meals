import axios from 'axios'

export class Meal {
	static async getMealCategories(req, res, next){
		try {
			const mealCategories = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
			// console.log(mealCategories) 
			res.status(200).json({
				data: mealCategories.data.categories
			})
		} catch(err) {
			// statements
			next(err)
		}
	}

	static async lookupMealWithLessIngredients(req, res, next){
		try {
			// statements
			const { mealIds } = req.body

			if (typeof mealIds !== "object" || mealIds.length < 1) {
				return res.status(400).json({
					error: "Bad input format!"
				})
			}

			let data = []
			let allIngredients
			let ingredient
			let ingredientLength = []
			let allMeals = []

			// make a request for each id
			for (let i = 0; i < mealIds.length; i++) {
				ingredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIds[i]}`)

				// grab all the ingredients from the requests
				const {
					strIngredient1, 
					strIngredient2,
					strIngredient3,
					strIngredient4,
					strIngredient5,
					strIngredient6,
					strIngredient7,
					strIngredient8,
					strIngredient9,
					strIngredient10,
					strIngredient11,
					strIngredient12,
					strIngredient13,
					strIngredient14,
					strIngredient15,
					strIngredient16,
					strIngredient17,
					strIngredient18,
					strIngredient19,
					strIngredient20
				} = ingredient.data.meals[0]

				allIngredients = [
					strIngredient1, 
					strIngredient2,
					strIngredient3,
					strIngredient4,
					strIngredient5,
					strIngredient6,
					strIngredient7,
					strIngredient8,
					strIngredient9,
					strIngredient10,
					strIngredient11,
					strIngredient12,
					strIngredient13,
					strIngredient14,
					strIngredient15,
					strIngredient16,
					strIngredient17,
					strIngredient18,
					strIngredient19,
					strIngredient20
				]

				// attach the ingredients that was grabbed to the response object
				ingredient.data.meals[0].Ingredient = allIngredients

				// push into the all meals array
				allMeals.push(ingredient.data.meals[0])

				// filter out the empty string and null values from the array
				const valuesToRemove = ['', null]
				const filteredIngredients = ingredient.data.meals[0].Ingredient.filter(data => !valuesToRemove.includes(data))

				// push the length of the array into the ingredient length
				ingredientLength.push(filteredIngredients.length)

			}

			// get the mininmum value in the ingredient array and push into the data array
			let minValue = Math.min(...ingredientLength)
			data.push(allMeals[ingredientLength.indexOf(minValue)])

			res.status(200).json({
				leastIngredientMeal: data
			})
		
		} catch(err) {
			// statements
			next(err);
		}
	}
}
