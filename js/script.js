const URL_PRODUCTS= "http://localhost:3000/products";

let arrayProducs = [];

const getAllProducts = async () => {
    //METODO GET
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    arrayProducs = data;
   // filtrar por categoria:

} 

const filterByCategory = async (categoria) => {
   await getAllProducts();
   const filteredProduct = arrayProducs.filter(item => item.category.includes(categoria))
   console.log("array filtrado", filteredProduct);
}

filterByCategory('milk')

//getAllProducts();

const getPostById = async (id) => {
   //METODO GET
   const response = await fetch(`${URL}/${id}`);
   const data = await response.json();
   console.log("datos del get post by ID", data);
}

//getPostById(2);


const createPost = async (post) => {
   // POST
   const product = {
    "imgProduct": "https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/1.png",
    "nameProduct": "Choco Chip Cookies",
    "grams":"550 G",
    "price": "$14.25",
    "category": [
        "snack",
        "biscuits"
    ]
   }
   const opciones = {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
   }
   const response = await fetch(URL_PRODUCTS, opciones);
   const data = await response.json();

   console.log("datos del POST post", data);
   getAllProducts();
}

// createPost();

const updatePost = (post) => {
   // PUT
}

const updatePost2 = (post) => {
   // PATCH
}