import { Router } from 'express'

import { Meal } from '../controllers/'

const router = Router()

router.route('/meals')
	.get(Meal.getMealCategories)

router.route('/meals')
	.post(Meal.lookupMealWithLessIngredients)

export default router
