// ================= CART =================

let cart = [];


// Get all Add to Cart buttons

const addToCartButtons = document.querySelectorAll(".add-to-cart");


// Add item to cart

addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));

        // Check if item already exists

        const existingItem = cart.find(function (item) {
            return item.name === name;
        });

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        alert(name + " added to cart!");

    });

});


// ================= UPDATE CART =================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");


    // Calculate total quantity

    let totalQuantity = 0;

    cart.forEach(function (item) {
        totalQuantity += item.quantity;
    });


    cartCount.textContent = totalQuantity;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-muted">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    // Display cart items

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className =
            "cart-item d-flex justify-content-between align-items-center";


        cartItem.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <small class="text-muted">
                    ₹${item.price} × ${item.quantity}
                </small>

            </div>

            <div class="d-flex align-items-center gap-2">

                <strong class="cart-item-price">
                    ₹${itemTotal}
                </strong>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="removeItem(${index})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = "₹" + total;

}


// ================= REMOVE ITEM =================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= CHECKOUT =================

document
    .getElementById("checkoutBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }


        let total = 0;

        cart.forEach(function (item) {

            total += item.price * item.quantity;

        });


        alert(
            "Order placed successfully!\n\n" +
            "Total Amount: ₹" + total +
            "\n\nThank you for ordering from Foodie!"
        );


        cart = [];

        updateCart();


        // Close Bootstrap modal

        const modalElement =
            document.getElementById("cartModal");

        const modal =
            bootstrap.Modal.getInstance(modalElement);

        if (modal) {
            modal.hide();
        }

    });


// ================= SEARCH =================

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase();


        const foodItems =
            document.querySelectorAll(".food-item");


        foodItems.forEach(function (item) {

            const foodName =
                item
                    .querySelector(".card-title")
                    .textContent
                    .toLowerCase();


            if (foodName.includes(searchText)) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    });


// ================= CONTACT FORM =================

document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("contactName").value;


        alert(
            "Thank you, " +
            name +
            "!\nYour message has been sent successfully."
        );


        this.reset();

    });


// ================= INITIAL CART =================

updateCart();