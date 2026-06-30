document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);

  const container = document.getElementById('productDetail');
  const backBtn = document.querySelector('.nav-link');

  if (!product) {
    container.innerHTML = `<div class="not-found"><h2>Product not found</h2><p><a href="index.html">Back to shop</a></p></div>`;
    return;
  }

  document.title = product.name + ' — PawJoy';

  container.innerHTML = `
    <div class="detail-grid">
      <div class="detail-image">
        <img src="${product.img}" alt="${product.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span class="img-placeholder" style="display:none">${product.emoji}</span>
      </div>
      <div class="detail-info">
        <h1 class="detail-name">${product.name}</h1>
        <div class="detail-price">$${product.price.toFixed(2)}</div>
        <p class="detail-desc">${product.desc}</p>
        <div class="detail-badges">
          <span class="badge">&#10003; Non-toxic materials</span>
          <span class="badge">&#10003; Cat-tested</span>
          <span class="badge">&#10003; Ships from US</span>
        </div>
        <button class="btn btn-primary btn-detail-cart" onclick="addToCart(${product.id}); event.stopPropagation();">
          Add to Cart — $${product.price.toFixed(2)}
        </button>
        <p class="detail-note">Free shipping on orders over $30</p>
      </div>
    </div>
  `;
});

// Re-init cart after DOM is ready
setTimeout(() => {
  updateCartBadge();
  updateCheckoutBtn();
  setupCartUI();
}, 50);

function setupCartUI() {
  const cartBtn = document.getElementById('cartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');

  cartBtn?.addEventListener('click', () => {
    cartOverlay.classList.add('open');
    renderCart();
  });
  cartClose?.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
  });
  cartOverlay?.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cartOverlay?.classList.remove('open');
  });
  document.getElementById('checkoutBtn')?.addEventListener('click', handleCheckout);
}

function handleCheckout() {
  if (cart.length === 0) return;
  const total = getCartTotal().toFixed(2);
  const items = cart.map(i => `${i.name} x${i.qty}`).join(', ');
  alert(`Order Summary:\n${items}\n\nTotal: $${total}\n\nDemo checkout — integrate PayPal/Stripe here.`);
}

// Show added message (reuse from app.js)
function showAddedMessage() {
  const msg = document.getElementById('addedMsg');
  if (msg) {
    msg.classList.add('visible');
    setTimeout(() => msg.classList.remove('visible'), 1500);
  }
}
