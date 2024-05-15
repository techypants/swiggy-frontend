import React, { useState, useEffect } from "react";
import MealItem from "./blocks";

function Main() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=American"
        );
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="meal-list grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 ">
        {meals.map((meal) => (
          <MealItem key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default Main;
