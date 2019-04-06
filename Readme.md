# Meals

[![Build Status](https://travis-ci.org/olamilekan000/Meals.svg?branch=master)](https://travis-ci.org/olamilekan000/Meals)

## Instructions

* clone app
```bash
git clone git@github.com:olamilekan000/Meals.git
```
* npm run dev
* make a GET request to `https://mymealzer.herokuapp.com/api/v1/meals` 
* to get the meal with the least ingredients, make a POST request to `https://mymealzer.herokuapp.com/api/v1/meals` with the following data:
```bash
POST{
	"mealIds": [52772, 52770, 52771, 52775]
}
```
* You should get a response with a meal of ID `52771`.
