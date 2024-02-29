console.log("clicked");

const btnContainerEl = document.getElementById("btn-container");

const fetchCategories = () => {
  const url = "https://openapi.programming-hero.com/api/videos/categories";
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach((card) => {
        console.log(card);
        const newBtn = document.createElement("button");
        newBtn.className =
          "bg-gray-200 font-medium hover:bg-gray-300 max-sm:mb-3 duration-300 text-black max-sm:px-4 max-sm:py-2 px-6 py-3 cursor-pointer rounded-lg";
        newBtn.innerText = card.category;
        newBtn.addEventListener("click", () =>
          fetchDataByCategories(card.category_id)
        );
        btnContainerEl.appendChild(newBtn);
      });
    });
};

const fetchDataByCategories = (categoryID) => {
  const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      console.log(data);
    });
};

fetchCategories();
