import { useContext, useLayoutEffect } from "react";
// import { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MEALS } from "../assets/data/dummy-data";
import IconButton from "../components/IconButton";
import List from "../components/mealDetail/List";
import Subtitle from "../components/mealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
// import { FavoritesContext } from "../store/context/favorite-context";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
const MealDetailScreen = ({ route, navigation }) => {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)
    const dispatch = useDispatch()
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavourite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavourite = favoriteMealIds.includes(mealId);
    const changeFavoriteStatusHandler = () => {
        if (mealIsFavourite) {
            //     favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({ id: mealId }))
        } else {
            //     favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({ id: mealId }))

        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        icon={mealIsFavourite ? "star" : "star-outline"}
                        color="gold"
                        onPress={changeFavoriteStatusHandler}
                    />
                );
            },
        });
    }, [navigation, changeFavoriteStatusHandler]);
    return (
        <ScrollView style={styles.rootContainer}>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <View>
                <MealDetails
                    textStyle={styles.detailText}
                    duration={selectedMeal.duration}
                    complexity={selectedMeal.complexity}
                    affordability={selectedMeal.affordability}
                />
            </View>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
};

export default MealDetailScreen;
const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    },
});
