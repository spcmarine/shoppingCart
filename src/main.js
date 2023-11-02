let shop = document.getElementById("shop");

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
        return `
            <div id=product-id-${x.id} class="item">
                <img width="220" src="${x.img}" alt="">
                <div class="details">
                    <h3>${x.name}</h3>
                    <p>${x.description}</p>
                    <div class="price-quantity">
                        <h2>£${x.price}</h2>
                        <div class="buttons">
                            <i class="bi bi-dash-lg"></i>
                            <div id=${x.id} class="quantity">0</div>
                            <i class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
};

generateShop();
