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
      <div class="col-12 col-md-12 col-lg-4">
         <div class="card text-certer bg-white pb-2">
            <div class="card-body text-dark">
               <div class="img-area mb-4">
                  <img class="img-fluid" src=${Product.imgProduct} alt=${Product.nameProduct}>
               </div>
               <h3 class="card-title">${Product.category}</h3>
               <p class="lead">${Product.nameProduct}</p>
               <p class="leadt">${Product.grams}</p>
               <p class="leadt">${Product.price}</p>
               
                  <button class="btn btn-primary" data-btn='bShoppingCart' data-id=${Product.id}>Add</button>
               
            </div> 
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