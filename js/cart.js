let cart = [];

function loadCart() {
  try {
    const data = localStorage.getItem('pawjoy_cart');
    cart = data ? JSON.parse(data) : [];
  } catch { cart = []; }
}

function saveCart() {
  localStorage.setItem('pawjoy_cart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
  updateCheckoutBtn();
}

function addToCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }
  saveCart();
  showAddedMessage();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = getCartCount();
}

function updateCheckoutBtn() {
  const btn = document.getElementById('checkoutBtn');
  if (btn) btn.disabled = cart.length === 0;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    document.getElementById('cartTotal').textContent = '$0.00';
    return;
  }
  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
  });
  container.innerHTML = html;
  document.getElementById('cartTotal').textContent = '$' + getCartTotal().toFixed(2);
}

function showAddedMessage() {
  const msg = document.getElementById('addedMsg');
  if (msg) {
    msg.classList.add('visible');
    setTimeout(() => msg.classList.remove('visible'), 1500);
  }
}

// Initialize
loadCart();
setTimeout(() => {
  updateCartBadge();
  updateCheckoutBtn();
}, 0);
