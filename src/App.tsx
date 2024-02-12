import { useState, useEffect } from "react";
import { api } from "./services/api";
import { categories } from "./data/categories";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`filter.php?c=${selectedCategory}`).then((response) => {
      setMeals(response.data.meals);
      setIsLoading(false);
    });
  }, [selectedCategory]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-background">
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <img src="prato.png" className="h-20 w-20 animate-spin" />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <div className="mt-10">
            <div className="max-w-md mx-auto flex">
              <select
                id="countries"
                defaultValue={selectedCategory}
                className="bg-primary text-white rounded-l-lg w-auto p-2.5"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="relative flex items-center w-full h-12 rounded-r-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="h-full w-full outline-none text-lg text-primary pr-2"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
            {filteredMeals.map((meal, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:text-primary hover:cursor-pointer"
              >
                <div className="p-2 flex justify-center">
                  <img className="rounded-md w-80 h-80" src={meal.strMealThumb || ""} />
                </div>

                <div className="px-4 pb-3">
                  <h5 className="text-xl font-semibold tracking-tight text-center">
                    {meal.strMeal}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
