// select over here all the element
const btnContainerEl = document.getElementById("btn-container");
const categoriesContainerEl = document.getElementById("categories-container");
const errorElementEl = document.getElementById("error-element");

let selectedCategory = 1000;
const fetchCategories = () => {
  const url = "https://openapi.programming-hero.com/api/videos/categories";
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach((card) => {
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
  selectedCategory = categoryID;
  const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      if (data.length === 0) {
        errorElementEl.classList.remove("hidden");
      } else {
        errorElementEl.classList.add("hidden");
      }
      categoriesContainerEl.innerHTML = "";
      data.forEach((video) => {
        let verifiedBadge = "";
        if (video.authors[0].verified) {
          verifiedBadge = `
          <i class="fa-solid fa-check"></i>
        `;
        }
        const newCard = document.createElement("div");
        newCard.className = "card bg-base-100 shadow-md border border-red-400";
        newCard.innerHTML = `
           <figure>
              <img
              class="h-auto w-full md:h-[220px] lg:h-[170px] object-cover"
                src="${video?.thumbnail}"
                alt="Shoes"
              />
            </figure>
            <div class="p-4 space-y-3">
              <h2 class="card-title">
                ${video?.title}
              </h2>
              <div class="">Views : ${video?.others.views}</div>
             <div class="flex items-center gap-3">
                <div>
                <img
                class="w-10 h-10 object-cover rounded-full"
                src="${video?.authors[0].profile_picture} "
                alt="Shoes"/>
                </div> 
                <div class="badge badge-outline">${video?.authors[0]?.profile_name}</div>
                ${verifiedBadge}
            </div>
            
        `;
        categoriesContainerEl.appendChild(newCard);
      });
    });
};

fetchCategories();
fetchDataByCategories(selectedCategory);
