// ==========================================
// UDO EKAUDO RESTAURANT WEBSITE
// ==========================================


// ==========================================
// MENU DATA
// ==========================================

// ADD OR EDIT YOUR FOODS HERE.
// Copy one object and change the information.


    const foods = [

    // ================= RICE =================

    {
        id: 1,
        name: "Rice",
        category: "rice",
        price: 1000,
        image: "rice.png",
        description: "Freshly prepared white rice."
    },


    // ================= SWALLOW / SIDES =================

    {
        id: 2,
        name: "Dry Beans",
        category: "beans",
        price: 500,
        image: "bean.jpeg",
        description: "Fresh dry beans, one portion."
    },

    {
        id: 3,
        name: "Yam",
        category: "swallow",
        price: 1000,
        image: "plain (8).png",
        description: "Three pieces of yam."
    },


    // ================= FISH =================

    {
        id: 4,
        name: "Fish Tail",
        category: "proteins",
        price: 2000,
        image: "fih tail.jpeg",
        description: "Delicious fish tail portion."
    },

    {
        id: 5,
        name: "Fish Centre",
        category: "proteins",
        price: 7000,
        image: "fish center.jpeg",
        description: "Large centre portion of fish."
    },


    // ================= MEAT =================

    {
        id: 6,
        name: "Goat Meat",
        category: "proteins",
        price: 7000,
        image: "goat meat.png",
        description: "Well-prepared and seasoned goat meat."
    },

    {
        id: 7,
        name: "Kpomo",
        category: "proteins",
        price: 1000,
        image: "kpomo.png",
        description: "Deliciously prepared kpomo."
    },

    {
        id: 8,
        name: "Shaki",
        category: "proteins",
        price: 1000,
        image: "plain (4).png",
        description: "Well-prepared shaki."
    },

    {
        id: 9,
        name: "Roundabout",
        category: "proteins",
        price: 1000,
        image: "roundbout.jpeg",
        description: "Well-prepared roundabout."
    },

    {
        id: 10,
        name: "Cow Tongue",
        category: "proteins",
        price: 1000,
        image: "plain (3).png",
        description: "Tenderly prepared cow tongue."
    },

    {
        id: 11,
        name: "Cow Ear",
        category: "proteins",
        price: 1500,
        image: "cow ear.png",
        description: "Well-prepared cow ear."
    },


    // ================= SIDES =================

    {
        id: 12,
        name: "Plantain",
        category: "swallow",
        price: 500,
        image: "plain (1).png",
        description: "Freshly prepared plantain, one portion."
    },

    {
        id: 13,
        name: "Egg",
        category: "proteins",
        price: 250,
        image: "egg.jpeg",
        description: "Fresh egg, sold individually."
    }



];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// DISPLAY MENU
// ==========================================

const foodGrid = document.getElementById("foodGrid");

function displayFoods(category = "all") {

    foodGrid.innerHTML = "";

    const filteredFoods =
        category === "all"
            ? foods
            : foods.filter(food => food.category === category);


    filteredFoods.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `

            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    onerror="this.src='https://placehold.co/600x400?text=Add+Food+Photo'"
                >

            </div>

            <div class="food-content">

                <h3>${food.name}</h3>

                <p>
                    ${food.description}
                </p>

                <div class="food-bottom">

                    <span class="price">
                        ${formatMoney(food.price)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})">

                        <i class="fas fa-plus"></i>
                        Add

                    </button>

                </div>

            </div>
        `;

        foodGrid.appendChild(card);

    });

}


// ==========================================
// MONEY FORMAT
// ==========================================

function formatMoney(amount) {

    return "₦" + Number(amount).toLocaleString("en-NG");

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    const food = foods.find(item => item.id === id);

    if (!food) return;


    const existing = cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");


    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = formatMoney(totalPrice);


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.src='https://placehold.co/100x100?text=Food'"
            >

            <div>

                <h4>${item.name}</h4>

                <p>
                    ${formatMoney(item.price * item.quantity)}
                </p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})">

                <i class="fas fa-trash"></i>

            </button>
        `;


        cartItems.appendChild(cartItem);

    });

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(id, amount) {

    const item = cart.find(food => food.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(food => food.id !== id);

    }


    updateCart();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id) {

    cart = cart.filter(food => food.id !== id);

    updateCart();

}


// ==========================================
// CART OPEN/CLOSE
// ==========================================

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");


function openCart() {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

}


function closeCart() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}


document.getElementById("cartButton")
    .addEventListener("click", openCart);


document.getElementById("closeCart")
    .addEventListener("click", closeCart);


cartOverlay.addEventListener("click", closeCart);


// ==========================================
// MENU FILTER
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.getAttribute("data-category");

        displayFoods(category);

    });

});


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


// ==========================================
// CHECKOUT
// ==========================================

const checkoutModal =
    document.getElementById("checkoutModal");


const checkoutButton =
    document.getElementById("checkoutButton");


const closeModal =
    document.getElementById("closeModal");


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Please add food to your cart first.");

        return;

    }

    displayCheckoutSummary();

    checkoutModal.classList.add("active");

});


closeModal.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

});


checkoutModal.addEventListener("click", event => {

    if (event.target === checkoutModal) {

        checkoutModal.classList.remove("active");

    }

});


// ==========================================
// CHECKOUT SUMMARY
// ==========================================

function displayCheckoutSummary() {

    const summary =
        document.getElementById("checkoutSummary");

    const total =
        document.getElementById("checkoutTotal");


    summary.innerHTML = "";


    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "summary-item";


        div.innerHTML = `

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                ${formatMoney(item.price * item.quantity)}
            </strong>

        `;


        summary.appendChild(div);

    });


    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    total.textContent = formatMoney(totalPrice);

}


// ==========================================
// ORDER FORM
// ==========================================

const orderForm =
    document.getElementById("orderForm");


orderForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("orderName").value;

    const phone =
        document.getElementById("orderPhone").value;

    const option =
        document.getElementById("deliveryOption").value;

    const address =
        document.getElementById("orderAddress").value;

    const instructions =
        document.getElementById("specialInstructions").value;


    let orderMessage =
        `Hello Udo EkaUdo,%0A%0A`;

    orderMessage +=
        `I want to place an order.%0A%0A`;

    orderMessage +=
        `Name: ${name}%0A`;

    orderMessage +=
        `Phone: ${phone}%0A`;

    orderMessage +=
        `Option: ${option}%0A`;

    orderMessage +=
        `Address: ${address}%0A`;


    if (instructions) {

        orderMessage +=
            `Special Instructions: ${instructions}%0A`;

    }


    orderMessage += `%0AORDER:%0A`;


    cart.forEach(item => {

        orderMessage +=
            `${item.name} × ${item.quantity} = ${formatMoney(item.price * item.quantity)}%0A`;

    });


    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    orderMessage +=
        `%0ATotal Food Cost: ${formatMoney(totalPrice)}%0A`;


    orderMessage +=
        `%0AI understand that payment is made before service and orders cannot be cancelled after confirmation.`;


    // ======================================
    // IMPORTANT:
    // CHANGE THIS TO THE RESTAURANT'S NUMBER
    // ======================================

    const restaurantWhatsApp =
        "2349053154348";


    const whatsappURL =
        `https://wa.me/${restaurantWhatsApp}?text=${orderMessage}`;


    window.open(whatsappURL, "_blank");


    alert(
        "Your order details have been prepared. Please send the WhatsApp message to confirm your order."
    );


    cart = [];

    updateCart();

    checkoutModal.classList.remove("active");

    closeCart();

    orderForm.reset();

});


// ==========================================
// FEEDBACK SYSTEM
// ==========================================

const feedbackForm =
    document.getElementById("feedbackForm");

const reviewsGrid =
    document.getElementById("reviewsGrid");


// Load saved reviews

let reviews =
    JSON.parse(localStorage.getItem("udoReviews")) || [];


function displayReviews() {

    reviews.forEach(review => {

        addReviewToPage(review);

    });

}


function addReviewToPage(review) {

    const card =
        document.createElement("div");

    card.className = "review-card";


    const stars =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);


    card.innerHTML = `

        <div class="review-stars">
            ${stars}
        </div>

        <p>
            "${review.text}"
        </p>

        <h4>
            ${review.name}
        </h4>

    `;


    reviewsGrid.appendChild(card);

}


feedbackForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("customerName").value;

    const rating =
        Number(document.getElementById("rating").value);

    const text =
        document.getElementById("feedbackText").value;


    const review = {

        name: name,

        rating: rating,

        text: text

    };


    reviews.push(review);


    localStorage.setItem(
        "udoReviews",
        JSON.stringify(reviews)
    );


    addReviewToPage(review);


    feedbackForm.reset();


    alert(
        "Thank you for your feedback!"
    );

});


// ==========================================
// COPY BANK ACCOUNT
// ==========================================

function copyAccountNumber() {

    const account =
        document.getElementById("accountNumber").textContent;

    navigator.clipboard.writeText(account);


    const message =
        document.getElementById("copyMessage");


    message.textContent =
        "Account number copied!";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}


// ==========================================
// START WEBSITE
// ==========================================

displayFoods();

displayReviews();

updateCart();