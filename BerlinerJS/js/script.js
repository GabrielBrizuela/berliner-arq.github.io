const productsInCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const toast = document.querySelector(".boton")
const toast2 = document.querySelector(".boton2")
const toast3 = document.querySelector(".boton3")
const toast4 = document.querySelector(".boton4")

let products = [];

if (location.pathname.endsWith("tienda.html")) {
    document.addEventListener("DOMContentLoaded", dbProducts);
}

function dbProducts() {
    $.ajax({
        url: "../database.json",
        success: function (response) {
            console.log(response);
            products = response;
            whatToRender();
        }, error: function (error) {
            console.log(error);
        }
    });
}

const addToCart = (id) => {
    const product = products.find(product => product.id == id);

    if (productsInCart.length > 0) {
        var dontExist = true;
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == id) {
                productsInCart[i].quantity += 1;
                dontExist = false;
            }
        }
        if (dontExist) {
            product.quantity = 1;
            productsInCart.push(product);
        }
    } else {
        product.quantity = 1;
        productsInCart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    Swal.fire({
        title: 'Producto agregado',
        text: `El producto ${product.nombre} se ha agregado al carrito`,
        icon: 'success'
    });
}

const buyProducts = () => {
    localStorage.removeItem("cart");
    productsInCart.length = 0;
    renderCart();
    totalPrice();
    Swal.fire({
        title: 'Compra realizada',
        text: 'Gracias por su compra, tu pedido esta en camino, en breve nos comunicaremos con usted. Tu numeros de pedido es: ' + Math.floor(Math.random() * 1000000),
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

const totalPrice = () => {
    let total = 0;
    productsInCart.forEach(product => {
        total += product.precio * product.quantity;
    });
    const options = {
        style: "currency",
        currency: "USD"
    }
    const numberFormat = new Intl.NumberFormat('en-US', options)
    if (total > 0) {
        totalContainer.innerHTML = `
                                    <h2>Total: ${numberFormat.format(total)}</h2>
                                    <div class="btnBuyCart">
                                        <a href="#" class="btn btn-primary" onClick="buyProducts()">Comprar</a>
                                    </div>
                                    
                                    `;
    } else {
        totalContainer.innerHTML = "";
    }
}

const removeFromCart = (id) => {
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == id) {
            productsInCart.splice(i, 1);
        }
    }
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    renderCart();
    totalPrice();
}

let artContainer = document.getElementById('artContainer');

const renderProducts = () => {
    products.forEach(product => {
        var productCard = document.createElement("div");
        productCard.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-sm-6", "col-12", "mb-5");
        productCard.innerHTML = `
            <div class="card" style="width: 18rem">
                <img
                src="${product.imagen}"
                class="card-img-top"
                alt=${"Imagen del producto " + product.nombre}
                />
                <div class="card-body">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text">
                        ${product.descripcion}
                    </p>
                    <a href="#" class="btn btn-primary" onClick="addToCart(${product.id})">Agregar al carrito</a>
                </div>
            </div>
            `;
        artContainer.appendChild(productCard);
    });
};

let cartContainer = document.getElementById('cartContainer');

const renderCart = () => {
    cartContainer.innerHTML = "";
    if (productsInCart.length > 0) {
        cartContainer.innerHTML += `
                                    <div class="row">
                                        <div class="col text-center">
                                            <h5>Producto</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Precio</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Cantidad</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Subtotal</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Eliminar</h5>
                                        </div>
                                    </div>
                                    `

        productsInCart.forEach(product => {
            let subtotal = Number(product.precio) * Number(product.quantity);
            var cartItem = document.createElement('div');
            cartItem.classList.add('row', 'cartItemContainer');
            cartItem.innerHTML += `
                                        <div class="col cartItem text-center">${product.nombre}</div>
                                        <div class="col cartItem text-center">$${product.precio}</div>
                                        <div class="col cartItem text-center">${product.quantity}</div>
                                        <div class="col cartItem text-center">$${subtotal}</div>
                                        <div class="col cartItem text-center">
                                            <i class="fas fa-trash-alt" onClick="removeFromCart(${product.id})"></i>
                                        </div>
                                        `;
            cartContainer.appendChild(cartItem);
        });
        totalPrice();
    } else {
        cartContainer.innerHTML = `
                                    <div class="row mt-5">
                                        <div class="col text-center">
                                            <h3>Tu carrito está vacio</h3>
                                        </div>
                                    </div>
                                    `;
    }

}


const whatToRender = () => {
    let path = window.location.pathname;
    if (path.endsWith("/tienda.html")) {
        renderProducts();
    } else if (path.endsWith("/cart.html")) {
        renderCart();
    }
};

whatToRender();


toast.addEventListener("click", () => {

    Toastify({
      text: "Su mensaje fue enviado con exito!",
      className: "boton",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #42ab49, #77dd77)",
      }
      }).showToast();
  })

toast2.addEventListener("click", () => {

    Toastify({
      text: "Contactate a nuestro mail!",
      className: "boton",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #42ab49, #77dd77)",
      }
      }).showToast();
  })

toast3.addEventListener("click", () => {

    Toastify({
      text: "Contactate a nuestro número!",
      className: "boton",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #42ab49, #77dd77)",
      }
      }).showToast();
  })

toast4.addEventListener("click", () => {

    Toastify({
      text: "Visita nuestro sitio web!",
      className: "boton",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #42ab49, #77dd77)",
      }
      }).showToast();
  })
