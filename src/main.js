let shop = document.getElementById("shop");
let basket = [];

let shopItems = [{
    id: 1, 
    name: 'Item 1', 
    price: 20, 
    description: "A description for item 1",
    img: "image/path-1.jpg"
}, {
    id: 2, 
    name: 'Item 2', 
    price: 30, 
    description: "A description for item 2",
    img: "image/path-2.jpg"
}, {
    id: 3, 
    name: 'Item 3', 
    price: 40, 
    description: "A description for item 3",
    img: "image/path-3.jpg"
}, {
    id: 4, 
    name: 'Item 4', 
    price: 50, 
    description: "A description for item 4",
    img: "image/path-4.jpg"
}]

let generateShop = () => {
    shop.innerHTML = shopItems.map((x) => {
        let { id, name, price, description, img } = x
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
                            <div id=${id} class="quantity">0</div>
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
    // console.log(selectedItem)
    if (search === undefined) {
      basket.push({
        id: selectedItem,
        quantity: 1,
      });
    } else {
      search.quantity += 1;
    }
    // console.log(basket);
    update(selectedItem);

  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if (search === undefined) return;
    else if (search.quantity === 0) return;
    else {
      search.quantity -= 1;
    }
    // console.log(basket);
    update(selectedItem);
    

    };

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.quantity);
    document.getElementById(id).innerHTML = search.quantity
    calculation()
}

let calculation = () => {
    console.log("calculation is running")
}