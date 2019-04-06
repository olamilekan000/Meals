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
				try {
					ingredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIds[i]}`)

					// grab all the ingredients from the requests
					const strgIngredients = ingredient.data && ingredient.data.meals && ingredient.data.meals[0];

					// attach the ingredients that was grabbed to the response object
					strgIngredients.Ingredient = strgIngredients && Object.keys(strgIngredients).map(key => strgIngredients[key]);


					// push into the all meals array
					allMeals.push(strgIngredients)

					// filter out the empty string and null values from the array
					const filteredIngredients = strgIngredients.Ingredient.filter(data => !!data)

					// push the length of the array into the ingredient length
					ingredientLength.push(filteredIngredients.length)
				} catch(e) {
					// statements
					console.log(e);
				}
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
