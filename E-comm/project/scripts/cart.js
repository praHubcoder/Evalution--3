

let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];

let totalCountElem = document.getElementById("total-count");
let totalValueElem = document.getElementById("total-value");
let cont = document.getElementById("container");

function updateCartInfo() {
    let totalCount = cartData.length;
    totalCountElem.textContent = `Total Items: ${totalCount}`;

    let totalValue = cartData.reduce((acc, item) => acc + item.price, 0);
    setTimeout(() => {
        totalValueElem.textContent = `Total Value: $${totalValue}`;
    }, 2000);
}

function displayCartData() {
    cont.innerHTML = "";
    cartData.forEach((el, i) => {
        let card = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.img;

        let category = document.createElement("p");
        category.textContent = `Category: ${el.category}`;

        let brand = document.createElement("p");
        brand.textContent = `Brand: ${el.brand}`;

        let details = document.createElement("p");
        details.textContent = `Details: ${el.details}`;

        let price = document.createElement("p");
        price.textContent = `Price: ${el.price}`;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function() {
            cartData.splice(i, 1);
            alert("Removed from cart");
            localStorage.setItem("cart-data", JSON.stringify(cartData));
            displayCartData();
            updateCartInfo();
        });

        card.append(image, category, brand, details, price, removeBtn);
        cont.append(card);
    });
}

displayCartData();
updateCartInfo();