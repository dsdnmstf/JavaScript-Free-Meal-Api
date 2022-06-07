//************** WINDOW ONLOAD ****************

// window.addEventListener("DOMContentLoaded", renderMealArea);
fetchMealArea();

async function fetchMealArea() {
  let link = `https://www.themealdb.com/api/json/v1/1/random.php`;
  const mealArea = await fetch(link);
  // console.log(mealArea);
  const data = await mealArea.json();
  // console.log(data);
  renderMealArea(data);
  // console.log(data);
}

function renderMealArea(data) {
  let mealsDisplay = document.querySelector(".meals-div");
  // console.log(data);
  data.meals.forEach((item) => {
    const { strMealThumb, strMeal, strInstructions, strYoutube } = item;
    // console.log(strMealThumb, strMeal);
    mealsDisplay.innerHTML += `
    <div class="card bg-success" style="width:25rem">
        <img src=${strMealThumb} class="card-img-top" alt="..." />
        <div class="card-body text-center">
          <h5 class="card-title text-warning">${strMeal}</h5>
          <p class="card-title text-white">You are viewing the dish of the day. If you want to see other options, you can search from the input section above.</p>
          <button
             type="button"
             class="btn btn-warning"
             data-bs-toggle="modal"
             data-bs-target="#staticBackdrop"
           >
             Get Receipe
           </button>

           <!-- Modal -->
           <div
             class="modal fade"
             id="staticBackdrop"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             tabindex="-1"
             aria-labelledby="staticBackdropLabel"
             aria-hidden="true"
           >
             <div class="modal-dialog ">
               <div class="modal-content">
                 <div class="modal-header">
                   <h5 class="modal-title text-warning" id="staticBackdropLabel">
                    ${strMeal}
                   </h5>
                   <button
                     type="button"
                     class="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                   ></button>
                 </div>
                 <div class="modal-body">${strInstructions}</div>
                 <div class="modal-footer">
                   <button
                     type="button"
                     id = "close"
                     class="btn "
                     data-bs-dismiss="modal"
                   >
                     Close
                   </button>
                   <a href="${strYoutube}" target="_blank">
                    <button href="" type="button" id="understood" class="btn">
                     Watch Video
                    </button>
                   </a>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
      `;
  });
}

//! ///////////////////////////////////////////////
//******* SELECT ***********

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  const selected = document.querySelector(".form-control").value;
  if (!selected) return;
  fetchMeal(selected);
});

const fetchMeal = async function (name) {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const meals = await fetch(url);
  // console.log(meals);
  const data = await meals.json();
  renderMeal(data);
};

function renderMeal(data) {
  let mealsDisplay = document.querySelector(".meals-div");
  mealsDisplay.innerHTML = "";
  data.meals.forEach((item, i) => {
    console.log(item);
    // const { strMealThumb, strMeal, strInstructions, strYoutube } = item;
    // console.log(strMeal, strYoutube);

    mealsDisplay.innerHTML += `
     <div class="card bg-success" style="width: 18rem">
         <img src=${item.strMealThumb} class="card-img-top" alt="..." />
         <div class="card-body text-center">
           <h5 class="card-title">${item.strMeal}</h5>

            <button
             type="button"
             class="btn btn-warning"
             data-bs-toggle="modal"
             data-bs-target="#staticBackdrop${i}"
           >
             Get Receipe
           </button>

           <!-- Modal -->
           <div
             class="modal fade"
             id="staticBackdrop${i}"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             tabindex="-1"
             aria-labelledby="staticBackdropLabel"
             aria-hidden="true"
           >
             <div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-header">
                   <h5 class="modal-title text-warning" id="staticBackdropLabel">
                    ${item.strMeal}
                   </h5>
                   <button
                     type="button"
                     class="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                   ></button>
                 </div>
                 <div class="modal-body">${item.strInstructions}</div>
                 <div class="modal-footer">
                   <button
                     type="button"
                     id = "close"
                     class="btn "
                     data-bs-dismiss="modal"
                   >
                     Close
                   </button>
                   <a href="${item.strYoutube}" target="_blank">
                    <button href="" type="button" id="understood" class="btn">
                     Watch Video
                    </button>
                   </a>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       `;
  });
}
