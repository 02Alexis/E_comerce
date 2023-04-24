// ----------------- variables and constants
let productsSC = [];
const httpShoppingCart = "http://localhost:3000/shoppingCart";
const shoppingCartContainer = document.getElementById('shoppingCartContainer')

// ----------------- functions
const getShoppingCartProduct = async() => {//get the products from the api
    try {
        // const Products = [];
        const { data } = await axios.get(httpShoppingCart)
        // console.log(data);
        return data;
        
    } catch (error) {
        console.error(error);
        return [];
    }
}

const showProductCart = (container, productsList) => {
    container.innerHTML = "";
 
    productsList.forEach((Product) => {
       container.innerHTML += `
     <div class="row border-bottom card-animatiom">
        <div class="col d-none d-md-block d-flex align-items-center">
          <img src=${Product.imgProduct} alt=${Product.nameProduct} class="img-fluid rounded-start">
        </div>
        <div class="col">
          <div class="row"><p class="text-truncate" style="max-width: 150px;">Chocola${Product.nameProduct}</p></div>
          <div class="row"><p>Sold By: </p></div>
          <div class="row"><p>Quantity: -${Product.grams}</p></div>
        </div>
        <div class="col">
          <div class="row"><p>Price</p></div>
          <div class="row"><p class="card-price-original">${Product.price} <span class="card-price-discount"> ${Product.price}</span></p></div>
          <div class="row"><p style="color: #0e856f;">You Save: ${Product.price} </p></div>
        </div>
        <div class="col">
          <div class="row"><p>Qty</p></div>
          <div class="row p-0">
            <div class="row justify-content-center align-items-center  rounded-pill">
              <div class="col text-start" id="" data-item="btn-subtrac">
                <i class="bi bi-dash-circle" style="color: #000; cursor: pointer;" data-id=${Product.id}></i>
              </div>
              <div class="col">
                <p class="card-text text-center" data-add-to-cart="add" id="">0</p>
              </div>
              <div class="col text-end" id="" data-item="btn-sum">
                <i class="bi bi-plus-circle" style="color: #000; cursor: pointer;" data-id=${Product.id}></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row"><p style="color: #5c5b5b">Total</p></div>
          <div class="row"><p>$10.25<span id="total"></span></p></div>
          <div class="row"><p></p></div>
        </div>
        <div class="col">
          <div class="row"><p style="color: #5c5b5b">Action</p></div>
          <div class="row"><a href="#" style="text-decoration: underline;" class="link-success">Save for later</a></div>
          <div class="row"><a href="#" style="text-decoration: underline;" class="link-danger">Remove</a></div>
        </div>
      </div>
      <hr class="bg.dark w-80" style="border: 1px solid #000;">
       `
    });
 }

document.addEventListener("DOMContentLoaded", async () => {
    productsSC = await getShoppingCartProduct();
    console.log(productsSC);
    showProductCart(shoppingCartContainer, productsSC)
})
