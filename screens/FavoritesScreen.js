import { useContext } from "react"
import MealsList from "../components/MealsList"
import { MEALS } from "../assets/data/dummy-data"
import { FavoritesContext } from "../store/context/favorite-context"
const FavoritesScreen = () => {
    const favoriteMealsCtx = useContext(FavoritesContext)
    const favoriteMeals = MEALS.filter((meal) => favoriteMealsCtx.ids.includes(meal.id))
    return <MealsList items={favoriteMeals} />
}

export default FavoritesScreen