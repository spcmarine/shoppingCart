let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket)

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let totalItems = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = totalItems;
}

calculation();

let generateCardItems = () => {
    if(basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
              let { id, item } = x;
              let search = shopItems.find((y) => y.id === id) || [];
              let price = x.quantity * search.price
              return `
            <div class="cart-item">
              <img width="100" src=${search.img} alt="" />
              <div class="details">
      
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">£ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>

                </div>
                   
      
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${x.quantity} </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
      
                <h3>£ ${price.toFixed(2)}</h3>
              </div>
            </div>
            `;
            })
            .join(""));
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class ="HomeBtn">Back to Home</button>
        </a>
        `
    }
};

generateCardItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
      basket.push({
        id: selectedItem,
        quantity: 1,
      });
    } else {
      search.quantity += 1;
    }
    
    update(selectedItem);
    generateCardItems();
    localStorage.setItem("data", JSON.stringify(basket))
    

  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if (search === undefined) return;
    else if (search.quantity === 0) return;
    else {
      search.quantity -= 1;
    }
    update(selectedItem);
    basket = basket.filter((x) => x.quantity !== 0);
    generateCardItems();
    localStorage.setItem("data", JSON.stringify(basket))

    };
let update = (id) => {
        let search = basket.find((x) => x.id === id);
        document.getElementById(id).innerHTML = search.quantity
        calculation();
        totalAmount();
    };
    
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem )
    localStorage.setItem("data", JSON.stringify(basket))
    generateCardItems();
    calculation();
    totalAmount();
}

let totalAmount = () => {
    if(basket.length !== 0){
       let totalBill = basket.map((x) => {
            let {quantity, id} = x;
            let search = shopItems.find((y) => y.id === id) || [];
            return quantity * search.price;
        }).reduce((x, y) => x + y, 0).toFixed(2);
        label.innerHTML = `
        <h2>Total Bill: £ ${totalBill}</h2>
        <button class="payment">Proceed to payment</button>
        <button onclick="clearCart()" class="clearBasket">Clear Basket</button>
        `

    }else{
        return
    }
}

let clearCart = () => {
    basket = []
    generateCardItems()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation();
}

totalAmount()