// ----------------- variables and constants
let Products = [];
const http = "http://localhost:3000/products";
const productContainer = document.getElementById('productContainer')
const favoritesContainer = document.getElementById('favoritesContainer')

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

const postProduct = async(endpoint, product) => {
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
         <figure class="cards__figure">
            <img class="cards__image card-img-top" src=${Product.imgProduct} alt=${Product.nameProduct}>
         </figure>
         <div class="card__buttons">
            <button class="cards__button cards__button--see">
               <span data-card='cards' name=${Product.nameProduct} class="material-symbols-outlined">
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

//agregar el evento click para enviar a la visat detalles
document.addEventListener("click", (event) => {
   const dataCardAttribute = event.target.getAttribute("data-card");
   if (dataCardAttribute === "cards") {
      const id = event.target.getAttribute("name");
      sessionStorage.setItem("idProduct", JSON.stringify(id));
      window.location.href = "./pages/details.html";
   }
});
// Agregar evento de clic para guardar en favoritos

document.addEventListener('click', async(event) => {
   const productId = event.target.getAttribute("data-id")
   const bFavorite = event.target.getAttribute("data-button")
   if (bFavorite) {
      const product = Products.find(prod => prod.id == productId)
      await postProduct("favorites",product)
      // Mostrar notificación de SweetAlert
      swal('¡Producto agregado!', 'El producto se ha agregado a la lista de favoritos', 'success');
   }
});
// productContainer.appendChild(productElement);