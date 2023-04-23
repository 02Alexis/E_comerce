 // Función para enviar el formulario
//  const submitForm = async (event) => {
//     event.preventDefault();
//     const form = document.getElementById('form');
//     const formData = new FormData(form);
//     const productData = {};
//     formData.forEach((value, key) => {
//       productData[key] = value;
//     });

//     try {
//       // Enviar datos a la API usando Axios
//       const response = await axios.post('http://localhost:3000/Products', productData);
//       console.log(response.data);
//       alert('Producto creado exitosamente!');
//     } catch (error) {
//       console.error(error);
//       alert('Error al crear el producto');
//     }
//   }

//   // Asignar la función al evento submit del formulario
//   document.getElementById('form').addEventListener('submit', submitForm);




const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formChildren = Array.from(form.children);

    const arrayInput = formChildren.filter(
        (item) => (item.localName === "input" || item.localName === "select")
    );

    const newProduct = {
        "imgProduct": "",       
        "nameProduct": "",
        "grams": "",
        "price": "",
        "category": "",
    };

        for (const key in newProduct){
            if (typeof newProduct[key]=== 'object') {
                for (const propertyName in newProduct[key]) {
                    const input =  arrayInput.find(item=> item.id == propertyName)
                    newProduct[key][propertyName] = input.value 
            }
        } else {
            const input = arrayInput.find((item) => item.id == key);
            newProduct[key] = input.value; 
        }
    }

    const validateCampos = validateInputs(newProduct);
    if (validateCampos) {

        newProduct.id = products.length + 1;

        products.push(newProduct);

        sessionStorage.setItem("products", JSON.stringify(products));

        Swal.fire("Buen trabajo!", "El Producto se ha creado exitosamente", "success");
        
        form.reset();
    }

})

const validateInputs = (objetoData) => {
    let camposVacios = "";
    for (const key in objetoData) {
        if (typeof objetoData[key] === "object") {
            for (const propertyName in objetoData[key]) {
                const valueProperty = objetoData[key][propertyName]
                camposVacios += !valueProperty ? `${propertyName} ` : "";
            }
        }else {
            const valueProperty = objetoData[key];
            camposVacios += !valueProperty ? `${key} `: "";
      }
    }
    if (camposVacios) {
        Swal.fire("Oops!", `Hay campos vacíos: ${camposVacios}`, "error");
        return false;
    } else {
        return true;
    }

}