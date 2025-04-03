
let globalProducts;

async function  fetchProducts(){
    const api = "https://dummyjson.com/products/"

    await fetch(api)
    .then(res => res.json())
    .then(data=>{
    data.products.reverse();
    globalProducts = data.products;
    loadProduct(data.products);
    });
}



function showProduct(product, productsContainer) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    imgContainer.appendChild(img);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('h5');
    price.innerHTML = `₹ ${(product.price * 85.53).toFixed(2)} 
        <span class="discount">(${product.discountPercentage}% off)</span>`;

    const description = document.createElement('p');
    description.textContent = product.description;

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(price);
    detailsContainer.appendChild(description);

    const addCart = document.createElement('button');
    addCart.id = `cart-btn${product.id}`

    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));

    const isInCart = localCartItems?.some(item => item.id === product.id);

    addCart.textContent = isInCart ? "View in Cart" : "Add to Cart";

    

    addCart.onclick = () => handleAddCart(product);
    detailsContainer.appendChild(addCart);

    productCard.appendChild(imgContainer);
    productCard.appendChild(detailsContainer);

    productsContainer.appendChild(productCard);
}

function loadProduct(products){
    const productsContainer = document.getElementById('products-container');
        products.forEach(product => {
            showProduct(product,productsContainer);
        });
}

document.getElementById('search').oninput = () => {
    const search = document.getElementById('search').value.toLowerCase();
    const filtered = globalProducts.filter(product => 
        product.title.toLowerCase().includes(search)
    );
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    filtered.forEach(product => showProduct(product, productsContainer));
}

document.getElementById('category').onchange = () => {
    const category = document.getElementById('category').value.toLowerCase();
    const filtered = category === 'all' 
        ? globalProducts 
        : globalProducts.filter(product => product.category.toLowerCase() === category);
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    filtered.forEach(product => showProduct(product, productsContainer));
}

function handleAddCart(product){
    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
    const cartButton = document.getElementById(`cart-btn${product.id}`).textContent;

    if(cartButton === "Add to Cart"){
        if(!localCartItems){
            const cartItems = [
                {
                    id:product.id,
                    quantity:1
                }
            ]
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
        } else if(localCartItems.length>0) {
            const cartItem = {
                id:product.id,
                quantity:1
            }
    
            localCartItems.push(cartItem);
            localStorage.setItem("cartItems",JSON.stringify(localCartItems));
        }
    }else if(cartButton === "View in Cart"){
        window.location.href = "cart.html";
    }
}

fetchProducts();


