import { Router } from 'express'

import { Meal } from '../controllers/'
import { notFound } from '../controllers/notFound'

const router = Router()

router.route('/meals')
	.get(Meal.getMealCategories)

router.route('/*')
	.get(notFound.returnNotFound)	

router.route('/meals')
	.post(Meal.lookupMealWithLessIngredients)

export default router
