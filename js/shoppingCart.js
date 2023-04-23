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
                <i class="bi bi-dash-circle" style="color: #000; cursor: pointer;"></i>
              </div>
              <div class="col">
                <p class="card-text text-center" data-add-to-cart="add" id="">0</p>
              </div>
              <div class="col text-end" id="" data-item="btn-sum">
                <i class="bi bi-plus-circle" style="color: #000; cursor: pointer;"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row"><p style="color: #5c5b5b">Total</p></div>
          <div class="row"><p>$10.25</p></div>
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

// // Variables
// const baseDeDatos = [
//     {
//         id: 1,
//         nombre: 'Patata',
//         precio: 1,
//         imagen: 'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/3.png'
//     },
//     {
//         id: 2,
//         nombre: 'Cebolla',
//         precio: 1.2,
//         imagen: 'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/5.png'
//     },
//     {
//         id: 3,
//         nombre: 'Calabacin',
//         precio: 2.1,
//         imagen: 'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/2.png'
//     },
//     {
//         id: 4,
//         nombre: 'Fresas',
//         precio: 0.6,
//         imagen: 'https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/1.png'
//     }

// ];

// let carrito = [];
// const divisa = '$';
// const DOMitems = document.querySelector('#items');
// const DOMcarrito = document.querySelector('#carrito');
// const DOMtotal = document.querySelector('#total');
// const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// // Funciones

// /**
//  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
//  */
// function renderizarProductos() {
//     baseDeDatos.forEach((info) => {
//         // Estructura
//         const miNodo = document.createElement('div');
//         miNodo.classList.add('card', 'col-sm-4');
//         // Body
//         const miNodoCardBody = document.createElement('div');
//         miNodoCardBody.classList.add('card-body');
//         // Titulo
//         const miNodoTitle = document.createElement('h5');
//         miNodoTitle.classList.add('card-title');
//         miNodoTitle.textContent = info.nombre;
//         // Imagen
//         const miNodoImagen = document.createElement('img');
//         miNodoImagen.classList.add('img-fluid');
//         miNodoImagen.setAttribute('src', info.imagen);
//         // Precio
//         const miNodoPrecio = document.createElement('p');
//         miNodoPrecio.classList.add('card-text');
//         miNodoPrecio.textContent = `${info.precio}${divisa}`;
//         // Boton 
//         const miNodoBoton = document.createElement('button');
//         miNodoBoton.classList.add('btn', 'btn-primary');
//         miNodoBoton.textContent = '+';
//         miNodoBoton.setAttribute('marcador', info.id);
//         miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
//         // Insertamos
//         miNodoCardBody.appendChild(miNodoImagen);
//         miNodoCardBody.appendChild(miNodoTitle);
//         miNodoCardBody.appendChild(miNodoPrecio);
//         miNodoCardBody.appendChild(miNodoBoton);
//         miNodo.appendChild(miNodoCardBody);
//         DOMitems.appendChild(miNodo);
//     });
// }

// /**
//  * Evento para añadir un producto al carrito de la compra
//  */
// function anyadirProductoAlCarrito(evento) {
//     // Anyadimos el Nodo a nuestro carrito
//     carrito.push(evento.target.getAttribute('marcador'))
//     // Actualizamos el carrito 
//     renderizarCarrito();

// }

// /**
//  * Dibuja todos los productos guardados en el carrito
//  */
// function renderizarCarrito() {
//     // Vaciamos todo el html
//     DOMcarrito.textContent = '';
//     // Quitamos los duplicados
//     const carritoSinDuplicados = [...new Set(carrito)];
//     // Generamos los Nodos a partir de carrito
//     carritoSinDuplicados.forEach((item) => {
//         // Obtenemos el item que necesitamos de la variable base de datos
//         const miItem = baseDeDatos.filter((itemBaseDatos) => {
//             // ¿Coincide las id? Solo puede existir un caso
//             return itemBaseDatos.id === parseInt(item);
//         });
//         // Cuenta el número de veces que se repite el producto
//         const numeroUnidadesItem = carrito.reduce((total, itemId) => {
//             // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
//             return itemId === item ? total += 1 : total;
//         }, 0);
//         // Creamos el nodo del item del carrito
//         const miNodo = document.createElement('li');
//         miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
//         miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
//         // Boton de borrar
//         const miBoton = document.createElement('button');
//         miBoton.classList.add('btn', 'btn-danger', 'mx-5');
//         miBoton.textContent = 'X';
//         miBoton.style.marginLeft = '1rem';
//         miBoton.dataset.item = item;
//         miBoton.addEventListener('click', borrarItemCarrito);
//         // Mezclamos nodos
//         miNodo.appendChild(miBoton);
//         DOMcarrito.appendChild(miNodo);
//     });
//     // Renderizamos el precio total en el HTML
//     DOMtotal.textContent = calcularTotal();
// }

// /**
//  * Evento para borrar un elemento del carrito
//  */
// function borrarItemCarrito(evento) {
//     // Obtenemos el producto ID que hay en el boton pulsado
//     const id = evento.target.dataset.item;
//     // Borramos todos los productos
//     carrito = carrito.filter((carritoId) => {
//         return carritoId !== id;
//     });
//     // volvemos a renderizar
//     renderizarCarrito();
// }

// /**
//  * Calcula el precio total teniendo en cuenta los productos repetidos
//  */
// function calcularTotal() {
//     // Recorremos el array del carrito 
//     return carrito.reduce((total, item) => {
//         // De cada elemento obtenemos su precio
//         const miItem = baseDeDatos.filter((itemBaseDatos) => {
//             return itemBaseDatos.id === parseInt(item);
//         });
//         // Los sumamos al total
//         return total + miItem[0].precio;
//     }, 0).toFixed(2);
// }

// /**
//  * Varia el carrito y vuelve a dibujarlo
//  */
// function vaciarCarrito() {
//     // Limpiamos los productos guardados
//     carrito = [];
//     // Renderizamos los cambios
//     renderizarCarrito();
// }

// // Eventos
// DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// // Inicio
// renderizarProductos();
// renderizarCarrito();

