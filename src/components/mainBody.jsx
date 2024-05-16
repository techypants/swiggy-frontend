import React, { useState, useEffect } from "react";
import MealItem from "./blocks";
import Pagination from "./pagination";

function Main() {
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState([]);
  const [cat_opt, setCat_opt] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("American");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e);
    setCurrentPage(1);
    console.log();
  };
  // console.log(selectedOption);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption}`
        );
        const categories = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );

        const data = await response.json();
        const category_data = await categories.json();

        // console.log(category_data);
        setCategory(category_data.meals);
        setMeals(data.meals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = meals.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="z-10">
        <div className="relative inline-block">
          <button
            className="button-style pl-3 pr-3 p-1"
            onClick={toggleDropdown}
          >
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 inline-block ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20 overflow-y-auto max-h-80">
              <ul>
                {category.map((option) => (
                  <li
                    key={option.strArea}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handleOptionClick(option.strArea)}
                  >
                    <input
                      type="radio" // Change type to "radio"
                      name="category" // Set the same name for all radio buttons to ensure only one can be selected
                      value={option.strArea}
                      checked={selectedOption === option.strArea} // Check if the current option is selected
                      onChange={() => handleOptionClick(option.strArea)}
                      className="mr-2 text-black"
                    />
                    {option.strArea}
                    {console.log(selectedOption)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="meal-list grid z-0 lg:grid-cols-4 grid-cols-1 md:grid-cols-2 ">
        {currentPosts.map((meal) => (
          <MealItem key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {console.log(postPerPage, meals.length)}
      <div>
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={meals.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Main;
