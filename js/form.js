//  Función para enviar el formulario
 const submitForm = async (event) => {
    event.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const productData = {};
    formData.forEach((value, key) => {
      productData[key] = value;
    });
console.log(formData);
    try {
      // Enviar datos a la API usando Axios
      const response = await axios.post('http://localhost:3000/Products', productData);
      console.log(response.data);
      alert('Producto creado exitosamente!');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Error al crear el producto');
    }
  }

  // Asignar la función al evento submit del formulario
  document.getElementById('form').addEventListener('submit', submitForm);

