// ----------------- variables and constants
let Products = [];
const http = "http://localhost:3000/products";
const productContainer = document.getElementById('productContainer')

// ----------------- functions
const getInfoProduct = async() => {//get the products from the api
   try {
      // const Products = [];
      const { data } = await axios.get(http)
      // console.log(data);
      return data;
      
   } catch (error) {
      console.error(error);
      return [];
   }
}

const showProductCategory = (container, productsList) => {
   container.innerHTML = "";

   productsList.forEach((Product) => {
      container.innerHTML += `
      <div class="card">
      <figure class="cards__figure">
                <img class="cards__image" src=${Product.imgProduct} class="card-img-top" alt=${Product.nameProduct}>
             </figure>
             <div class="card__buttons">
                <button class="cards__button cards__button--delete">
                   <span class="material-symbols-outlined">
                   visibility
                   </span>
                </button>
                <button class="cards__button cards__button--delete">
                   <span class="material-symbols-outlined">
                   autorenew
                   </span>
                </button>
                <button class="cards__button cards__button--edit">
                   <span class="material-symbols-outlined">
                   favorite
                   </span>
                </button>
             </div>
             <div class="card-body">
                <h5 class="card-title">${Product.nameProduct}</h5>
                <p class="card-text">${Product.price}</p>
                <div class="rating">
                   <span class="star">&#9733;</span>
                   <span class="star">&#9733;</span>
                   <span class="star">&#9733;</span>
                   <span class="star">&#9733;</span>
                   <span class="star">&#9733;</span>
                </div>
                <a href="#" class="btn btn-primary">Add</a>
             </div>
             </div> 
      `
   });
}

// ----------------- Execution
document.addEventListener("DOMContentLoaded", async () => {
   Products = await getInfoProduct();
   console.log(Products);
   showProductCategory(productContainer, Products)
})