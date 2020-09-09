const productsDOM = document.querySelector(".product-center");
const bodyDOM = document.getElementById("bodyDOM");

// get the list of products using fetch
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items.map(
                (items) => {
                    return items
                }
            )
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Display valid products on UI
class ProductsUI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container" onclick="showDetails(${product.id})">
                    <img src=${product.productImg[0]} class="product-img">
                </div>
                <p>${product.title}</p>
                <h2>${product.type}</h2>
                <h4>$${product.price}</h4>
            </article>`;
        });
        if (products.length == 0) {
            result = `<h4>No Match Found</h4>`
        }
        productsDOM.innerHTML = result;
    }
}

// On Initial Load Displays List of Products
document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    const productsUi = new ProductsUI();
    products.getProducts().then((products) => productsUi.displayProducts(products));
});

// Search Results
var searchProducts = () => {
    var searchText = document.getElementById("searchText").value;
    const products = new Products();
    const productsUi = new ProductsUI();
    products.getProducts().then((products) => {
        let searchResult = products.filter((e) => { return e.title.toLowerCase().includes(searchText.toLowerCase()) });
        productsUi.displayProducts(searchResult);
    });
};

// Product Details
var showDetails = (id) => {
    const products = new Products();
    products.getProducts().then((products) => {
        let productDetails = products.filter((e) => e.id == id);
        bodyDOM.innerHTML = `
            <div class="preview col-md-6 col-sm-12" style="overflow: hidden; height: 500px;">
            <div class="preview-pic tab-content">
                <img class="photo" src=${productDetails[0].productImg[0]} alt="Product View">
            </div>
            </div>
            <div class="col-md-6 col-sm-12">
            <span class="product-title">${productDetails[0].title}</span>
            <h3 class="product-type">${productDetails[0].type}</h3>
            <p class="product-description">${productDetails[0].description}</p>
            <div class="mb-4 mt-2">
                <span>Color</span>
            </div>
            <div class="mb-4 mt-2">
                <p>Price Per Unit</p>
                <span class="price">${productDetails[0].price}</span>
                <div class="buy-btn">
                    <button class="add-to-cart btn btn-primary mr-2" type="button">Buy Now</button>
                    <span><i class="fa fa-shopping-cart"></i></span>
                </div>
            </div>
        </div>
        `;
    }

    );
};
