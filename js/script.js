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

const getProduct = async(endpoint) => {//save the product in favorite
   try {
      const result = await axios.get(`http://localhost:3000/${endpoint}`)
      console.log(result);
      return result.data;
   } catch (error) {
      console.log(error);
      return [];
   }
}

const postProduct = async(endpoint, product) => {//save the product in favorite
   try {
      const result = await axios.post(`http://localhost:3000/${endpoint}`,product)
      console.log(result);
   } catch (error) {
      console.log(error);
   }
}

const postShoppingCar = async(endpoint, product) => {//save the product in shoppingCar
   try {
      const result = await axios.post(`http://localhost:3000/${endpoint}`,product)
      console.log(result);
   } catch (error) {
      console.log(error);
   }
}

const showProductCategory = (container, productsList) => {
   container.innerHTML = "";

   productsList.forEach((Product) => {
      container.innerHTML += `
      <div class="card">
         <div class="card-image-container">
            <img class="card-image" src=${Product.imgProduct} alt=${Product.nameProduct}>
         </div>
            <div class="card__buttons">
               <button class="cards__button cards__button--see">
                  <span data-card='cards' name=${Product.id} src=${Product.imgProduct} class="material-symbols-outlined">
                  visibility
                  </span>
               </button>
               <button class="cards__button cards__button--autorenew">
                  <span class="material-symbols-outlined">
                  autorenew
                  </span>
               </button>
               <button class="cards__button cards__button--favorite">
                  <span data-button='bFavorite' data-id=${Product.id} class="material-symbols-outlined">
                  favorite
                  </span>
               </button>
            </div>
            <div class="card-content">
               <p class="card-description">${Product.nameProduct}</p>
               <div class="card-prices">
                  <span class="card-price-original">${Product.price}</span>
                  <span class="card-price-discount">${Product.price} </span>
               </div>
               <div class="rating">
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="star">&#9733;</span>
                  <span class="card-price-original">In Stock</span>
               </div>
               <button class="card-button" data-btn='bShoppingCart' data-id=${Product.id}>
                  <span class="btn-text">Add</span>
                  <span class="btn-icon"><i class="fas fa-plus"></i></span>
               </button>
            </div>
         </div> 
      </div>
      `
   });
}

// ----------------- Execution
document.addEventListener("DOMContentLoaded", async () => {
   Products = await getInfoProduct();
   console.log("hoola", Products);
   showProductCategory(productContainer, Products)
})

//add click event to send to details view
document.addEventListener("click", (event) => {
   const dataCardAttribute = event.target.getAttribute("data-card");
   const id = Number(event.target.getAttribute("name"));
   if (dataCardAttribute === "cards") {
      const id = event.target.getAttribute("name");
      sessionStorage.setItem("idProduct", JSON.stringify(id));
      window.location.href = "./pages/details.html";
   }
});



// Add click event to save to favorites
document.addEventListener('click', async(event) => {
   const productId = event.target.getAttribute("data-id")
   const bFavorite = event.target.getAttribute("data-button")
   if (bFavorite) {
      const product = Products.find(prod => prod.id == productId)
      const favorites = await getProduct("favorites")
      if (favorites.find(prod => prod.id == productId)) {
         swal('¡ya se encuentra en favoritos!', 'Tu producto ya se encuentra en tu lista de deseos', 'info');
      } else {
         await postProduct("favorites",product)
         // Mostrar notificación de SweetAlert
         swal('¡Producto agregado!', 'El producto se ha agregado a la lista de favoritos', 'success');
      }      
   }
});

// Add click event to save to shoppingCart
document.addEventListener('click', async(event) => {
   const shoppingId = event.target.getAttribute("data-id")
   const bShoppingCart = event.target.getAttribute("data-btn")
   if (bShoppingCart) {
      const product = Products.find(prod => prod.id == shoppingId)
      await postShoppingCar("shoppingCart",product)
      // Mostrar notificación de SweetAlert
      swal('¡Producto agregado!', 'El producto se ha agregado al carrito de compras', 'success');
   }
});

//-----------------------Filtrado---------------------
const categories = ["vegetable"];

// Products.forEach((item) => {
//    if (!categories.includes(item.category)) {
//       categories.push(item.category);
//    }
// });
   
   document.addEventListener("click", (event) => {
      
      if (event.target.classList.contains("filterButton")){
         const filter = event.target.name;
         console.log(filter);
         const filterProducts = Products.filter(item => {
            return item.category.includes(filter)
         })
         showProductCategory(productContainer, filterProducts)
      }
      // const productFilter =
      //   item === "vegetable"
      //     ? Products
      //     : Products.filter((element) => element.category === item);
   });
