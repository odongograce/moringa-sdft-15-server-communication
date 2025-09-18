function addNewProduct(product) {
    fetch("http://localhost:3002/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(product),
    });
}

function getProducts() {
    return fetch("http://localhost:3002/products", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => data);
}

function getProductById(id) {
    return fetch(`http://localhost:3002/products/${id}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => data);
}

function deleteProduct(id) {
    fetch(`http://localhost:3002/products/${id}`, {
        method: "DELETE",
    });
}


async function displaySingleProduct(id) {
    const product = await getProductById(id);


    const display = document.querySelector("#product-view")

    display.innerHTML += ` <form>

     <div class="card col-3 mx-auto mb-2" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                
                <label for="name" class="form-label">Product Name</label>
                <input type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp" value="${product.productName}">
                                    
                    <label for="price" class="form-label">Price</label>
                    <input type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp" value="${product.price}">
                  
                    
                    <label for="description" class="form-label">Description</label>
                    <input type="text" name="name" class="form-control" id="name" aria-describedby="emailHelp" value="${product.description}">
              
             <button onclick="patchProduct(${product.id})" class="btn btn-success btn-sm">Update</button>
               <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">x</button>
        </form>
     
     
     
     `
}

async function displayProducts() {
    const products = await getProducts();

    const container = document.querySelector("#product-container");

    for (product of products) {
        container.innerHTML += ` <div class="card col-3 mx-auto mb-2" style="width: 18rem;">
                <img src="${product.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                
                    <h5 class="card-title"> ${product.productName}</h5>
                    <h5>Ksh.${product.price}</h5>
                    <p class="card-text">${product.description}</p>
                    <button onclick="displaySingleProduct(${product.id})" class="btn btn-primary btn-sm">View</button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">x</button>
                </div>
            </div>`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayProducts();

    document
        .querySelector("#frm-new-product")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            const product = {
                productName: event.target.name.value,
                price: event.target.price.value,
                description: event.target.description.value,
            };
            addNewProduct(product);
        });
});