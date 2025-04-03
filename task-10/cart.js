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

function loadProduct(products){
    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const filtered = products.filter(product => 
        localCartItems.some(item => item.id === product.id)
    );

    console.log(filtered);
    const productsContainer = document.getElementById('products-container');
    filtered.forEach(product => {
            showProduct(product,productsContainer);
        });
    calculateAmount();
}

function showProduct(product, productsContainer) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.id = `card${product.id}`

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


    const buttons = document.createElement('div');
    buttons.classList.add('quantity')

    const increment = document.createElement('button');
    increment.id = `cart-btn+${product.id}`
    increment.textContent = '+';


    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartItem = localCartItems.find(item => item.id === product.id);
    const quantityElememt = document.createElement('p');
    quantityElememt.textContent = cartItem ? cartItem.quantity : 0;
    quantityElememt.id = `quantity${product.id}`;

    const decrement = document.createElement('button');
    decrement.id = `cart-btn-${product.id}`;
    decrement.textContent = '-';

    increment.onclick = ()=> handleIncrement(product,cartItem.quantity);
    decrement.onclick =()=> handleDecrement(product,cartItem.quantity);
    
    buttons.appendChild(decrement);
    buttons.appendChild(quantityElememt);
    buttons.appendChild(increment);


    detailsContainer.appendChild(buttons);

    productCard.appendChild(imgContainer);
    productCard.appendChild(detailsContainer);

    productsContainer.appendChild(productCard);
}

function handleIncrement(product, quantity){
    const quantityElememt = document.getElementById(`quantity${product.id}`);


    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const updatedCart = localCartItems.map(item=>{
        if(item.id === product.id){
            return({...item, quantity: item.quantity+1})
        }else{
            return item;
        }
    })

    // console.log(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    const newCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedQuantity = newCart.find(item=> item.id === product.id);

    quantityElememt.textContent = updatedQuantity.quantity;
    calculateAmount();

}

function handleDecrement(product, quantity){
    const quantityElememt = document.getElementById(`quantity${product.id}`);
    
    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const updatedCart = localCartItems.map(item => {
        if(item.id === product.id){
            return ({...item, quantity: item.quantity-1});
        }else{
            return item;
        }
    });

    localStorage.setItem('cartItems',JSON.stringify(updatedCart));
    const newCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedQuantity = newCart.find(item=> item.id === product.id);

    quantityElememt.textContent = updatedQuantity.quantity;

    if(updatedQuantity.quantity === 0){
        const removeProduct = newCart.filter(item=> item.id !== product.id);
        localStorage.setItem('cartItems',JSON.stringify(removeProduct));
        document.getElementById(`card${product.id}`)?.remove();
    }

    if(JSON.parse(localStorage.getItem('cartItems')).length<=0){
        localStorage.removeItem("cartItems");
    }
    calculateAmount();

}

function calculateAmount(){
    const nav = document.getElementById('amount');
    document.getElementById('amount').innerHTML="";

    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let totalAmount=0;

    localCartItems.forEach(item =>{
        const product = globalProducts.find(products => products.id === item.id);
        
        totalAmount = totalAmount + ((product.price*85.53) * item.quantity);
    })

    // Tax Included
    const tax = (totalAmount/100 )*18;
    if(localCartItems.length>0){
        const deliveryFee = 50;
        totalAmount = totalAmount+ deliveryFee;
    }
    totalAmount = totalAmount+ tax;
    
    console.log(totalAmount.toFixed(2));

    const amountContainer = document.createElement('div');
    
    amountContainer.innerHTML = 
    `<p>Delivery Fee : </p> <span>${localCartItems.length>0 ? "₹50":"₹0"} </span> <p> Tax Amount : </p> <span>₹${tax.toFixed(2)} (18%) </span> <div class="total"> <p>Total Payable Amount : </p> <span>₹${totalAmount.toFixed(2)}</span></div>`;

    nav.appendChild(amountContainer);

}

fetchProducts();