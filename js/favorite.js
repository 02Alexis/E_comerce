// ----------------- variables and constants
let productsF = [];
const httpFavorite = "http://localhost:3000/favorites";
const favoritesContainer = document.getElementById('favoritesContainer')

// ----------------- functions
const getFavoriteProduct = async() => {//get the products from the api
    try {
       // const Products = [];
       const { data } = await axios.get(httpFavorite)
      //  console.log(data);
       return data;
       
    } catch (error) {
       console.error(error);
       return [];
    }
 }

const showProductFavorite = (container, productsList) => {
   container.innerHTML = "";

   productsList.forEach((Product) => {
      container.innerHTML += `
      <div>
         <div class="card-image-container">
            <img class="card-image" src=${Product.imgProduct} alt=${Product.nameProduct}>
         </div>
         <div class="card-content">
            <h2 class="card-name">${Product.category}</h2>
            <p class="card-description"">${Product.nameProduct}</p>
            <p class="card-name"">${Product.grams}</p>
            <div class="card-prices">
               <span class="card-price-original">${Product.price}</span>
               <span class="card-price-discount">${Product.price} </span>
            </div>
            <button class="card-button" data-btn='bShoppingCart' data-id=${Product.id}>Add <i class="fas fa-plus"></i></button>
         </div>
      </div>
      `
   });
}

 document.addEventListener("DOMContentLoaded", async () => {
    productsF = await getFavoriteProduct();
    console.log(productsF);
    showProductFavorite(favoritesContainer, productsF)
 })