let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log("JavaScript is running")

let generateShop = () => {
    shop.innerHTML = shopItems.map((x) => {
        let { id, name, price, description, img } = x
        let search = basket.find((x) => x.id === id) || []
        return `
            <div id=product-id-${id} class="item">
                <img width="220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h2>£${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.quantity === undefined ? 0: search.quantity}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
};

generateShop();

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
    
    localStorage.setItem("data", JSON.stringify(basket))

    };

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.quantity
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let totalItems = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = totalItems;
}

calculation();
