const videoPlayerInfo = (contenedor, Product) => {
    const figure = document.createElement("figure");
    figure.classList.add("main__figure");
    figure.innerHTML = `<img class="card-image" src=${Product.imgProduct} alt=${Product.nameProduct}>`;
    contenedor.appendChild(figure);

    contenedor.appendChild(list);
};