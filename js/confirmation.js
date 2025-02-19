//AddEventListner for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    loadOrderSummary();
});

//genetate and display the order summary - product details and total price
function loadOrderSummary() {
    const orderContainer = document.querySelector(".confirmation-cont");
    let order = JSON.parse(sessionStorage.getItem("order")) || [];

    //if there is no products in the order show this message
    if (order.length === 0) {
        orderContainer.innerHTML += "<p>No order found.</p>";
        return;
    }

    let total = 0;
    const orderList = document.createElement("div");
    orderList.classList.add("order-summary");

    order.forEach(product => {
        //calculate the total price for all the items in the order
        const itemTotalPrice = product.price * product.quantity;
        total += itemTotalPrice;

        //div created for each product in the order
        const itemElement = document.createElement("div");
        itemElement.classList.add("order-item");

        itemElement.innerHTML = `
            <div class="order-product">
                <img src="${product.image.url}" alt="${product.title}" class="order-image">
                <div class="order-details">
                    <h3 class="order-summary-title">${product.title}</h3>
                    <p class="order-summary-details">Quantity: ${product.quantity}</p>
                    <p class="order-summary-details">Price: ${product.price}$</p>
                </div>
            </div>
        `;

        orderList.appendChild(itemElement);
    });

    orderContainer.appendChild(orderList);

    const totalElement = document.createElement("h3");

    //displays the total for the order with only 2 decimal places 
    totalElement.textContent = `Total: ${total.toFixed(2)}$ incl. Taxes`;
    orderContainer.appendChild(totalElement);
}
