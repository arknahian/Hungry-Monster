const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    const userInput = document.querySelector("#user-input");
    getData(userInput)
    .then(res => {
        console.log(res)
        console.log(res.meals[0].strIngredient1)
        

        const meals = res.meals;
        meals.forEach(item => {
            console.log(item.strMeal);
            
            const foodCardContainer = document.getElementById("food-card-container");

            const newFoodCard = document.createElement("div");
            newFoodCard.className = "food-card";

            newFoodCard.addEventListener("click", (event) => {
                console.log(event.target.parentElement.childNodes[0].src);
                // const targetImg = event.target.parentNode.img.src;
                const popFoodName = document.querySelector("#popup-food-name");
                const popup = document.querySelector("#popup");
                popup.style.display = "flex";
                popFoodName.innerText = event.target.parentElement.childNodes[1].innerText;
                const popupImg = document.querySelector("#popup-img");
                popupImg.src = event.target.parentElement.childNodes[0].src;

                const crossBtn = document.querySelector("#cross")
                crossBtn.addEventListener("click", () => {
                    popup.style.display = "none";
                })
            })




            const newFoodImg = document.createElement("img");
            newFoodImg.className = "food-img";
            newFoodImg.src = item.strMealThumb;
            newFoodCard.appendChild(newFoodImg);

            const newFoodName = document.createElement("h3");
            newFoodName.className = "food-name";
            newFoodName.innerText = item.strMeal;
            newFoodCard.appendChild(newFoodName);

            foodCardContainer.appendChild(newFoodCard);

        })
    })
    .catch(err => {
        alert(`Sorry Can't find `)
    })
})

const getData = async (input) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input.value}`)
    // const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`);
    if (!res.ok) {
        const message = `Error ${res.status}`
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}









