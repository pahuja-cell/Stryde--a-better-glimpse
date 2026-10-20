const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(targetDate.getHours() + 12);
targetDate.setMinutes(targetDate.getMinutes() + 45);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl) return;

  const now = new Date();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 60000);

const sizeButtons = document.querySelectorAll(".size-btn");
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".size-row");
    group.querySelectorAll(".size-btn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const styleForm = document.getElementById("styleForm");
const styleStatus = document.querySelector(".form-status");

if (styleForm && styleStatus) {
  styleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(styleForm);
    const name = formData.get("fullName");
    const style = formData.get("styleType");

    styleStatus.textContent = `Thanks, ${name}! Your ${style.toLowerCase()} fit request has been received.`;
    styleForm.reset();
  });
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.querySelector(".newsletter-status");

if (newsletterForm && newsletterStatus) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(newsletterForm).get("newsletterEmail");
    newsletterStatus.textContent = `You’re on the list, ${email}. New drops are headed your way.`;
    newsletterForm.reset();
  });
}

const cart = [];
const cartPanel = document.getElementById("cartPanel");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartCount = document.getElementById("cart-count");
const summaryItems = document.getElementById("summaryItems");
const subtotalValue = document.getElementById("subtotalValue");
const shippingValue = document.getElementById("shippingValue");
const totalValue = document.getElementById("totalValue");

function getSelectedSize(card) {
  const active = card.querySelector(".size-btn.active");
  return active ? active.textContent.trim() : "M";
}

function updateCartUI() {
  if (!cartItemsContainer || !cartSubtotal || !cartCount || !summaryItems || !subtotalValue || !shippingValue || !totalValue) {
    return;
  }

  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    cartItemsContainer.innerHTML = '<div class="summary-item"><span>Your bag is empty</span></div>';
  }

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>${item.size}</span>
      </div>
      <div class="cart-item-price">£${item.price}</div>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartSubtotal.textContent = `£${subtotal}`;
  cartCount.textContent = cart.length;

  const shipping = subtotal > 0 ? 6 : 0;
  const total = subtotal + shipping;

  subtotalValue.textContent = `£${subtotal}`;
  shippingValue.textContent = `£${shipping}`;
  totalValue.textContent = `£${total}`;

  summaryItems.innerHTML = "";

  if (!cart.length) {
    summaryItems.innerHTML = '<div class="summary-item"><span>No items yet</span></div>';
    return;
  }

  cart.forEach((item) => {
    const node = document.createElement("div");
    node.className = "summary-item";
    node.innerHTML = `
      <div>
        <span>${item.name}</span>
        <small>${item.size}</small>
      </div>
      <strong>£${item.price}</strong>
    `;
    summaryItems.appendChild(node);
  });
}

if (cartToggle) {
  cartToggle.addEventListener("click", () => {
    if (!cartPanel) return;
    cartPanel.classList.toggle("open");
    cartPanel.setAttribute("aria-hidden", String(!cartPanel.classList.contains("open")));
  });
}

if (closeCart && cartPanel) {
  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    cartPanel.setAttribute("aria-hidden", "true");
  });
}

document.querySelectorAll(".add-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const name = card.dataset.product;
    const price = Number(card.dataset.price);
    const size = getSelectedSize(card);

    cart.push({ name, price, size });
    updateCartUI();

    if (cartPanel) {
      cartPanel.classList.add("open");
      cartPanel.setAttribute("aria-hidden", "false");
    }
  });
});

document.querySelectorAll(".payment-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".payment-btn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const checkout = document.getElementById("checkout");
    if (checkout) {
      checkout.scrollIntoView({ behavior: "smooth" });
    }
    if (cartPanel) {
      cartPanel.classList.remove("open");
    }
  });
}

const checkoutForm = document.getElementById("checkoutForm");
const checkoutStatus = document.querySelector(".checkout-status");

if (checkoutForm && checkoutStatus) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkoutStatus.textContent = "Payment successful. Your order is confirmed.";
    checkoutForm.reset();
    cart.length = 0;
    updateCartUI();
  });
}

updateCartUI();
