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

// === Checkout / PayPal ===
document.addEventListener('click', function(e) {
  if (e.target.id === 'checkoutBtn' || e.target.closest('#checkoutBtn')) {
    if (cart.length === 0) return;
    showCheckout();
  }
});

function showCheckout() {
  document.getElementById('cartOverlay').style.display = 'none';
  document.getElementById('checkoutOverlay').style.display = 'flex';
  document.getElementById('checkoutStatus').textContent = '';

  var html = '';
  cart.forEach(function(item) {
    html += '<div style=\"display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #F1F5F9;font-size:14px\"><span>' + item.emoji + ' ' + item.name + ' x' + item.qty + '</span><span>\$' + (item.price * item.qty).toFixed(2) + '</span></div>';
  });
  document.getElementById('checkoutItems').innerHTML = html;
  document.getElementById('checkoutTotal').textContent = '\$' + getCartTotal().toFixed(2);
  renderPayPalButton();
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').style.display = 'none';
}

function renderPayPalButton() {
  var container = document.getElementById('paypalButtonContainer');
  container.innerHTML = '';
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style=\"color:#EF4444;font-size:13px\">PayPal loading failed. Refresh and try again.</p>';
    return;
  }
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{ amount: { value: getCartTotal().toFixed(2) } }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        submitOrder(details.id);
      });
    },
    onError: function(err) {
      document.getElementById('checkoutStatus').textContent = 'Payment error: ' + err.message;
    }
  }).render('#paypalButtonContainer');
}

function submitOrder(paypalOrderId) {
  var name = document.getElementById('coName').value.trim();
  var email = document.getElementById('coEmail').value.trim();
  var phone = document.getElementById('coPhone').value.trim();
  var address = document.getElementById('coAddress').value.trim();
  var city = document.getElementById('coCity').value.trim();
  var state = document.getElementById('coState').value.trim();
  var zip = document.getElementById('coZip').value.trim();
  if (!name || !email || !phone || !address || !city || !state || !zip) {
    document.getElementById('checkoutStatus').textContent = 'Please fill in all fields';
    return;
  }

  var products = cart.map(function(i) { return i.name + ' x' + i.qty; }).join(', ');
  var total = getCartTotal().toFixed(2);

  document.getElementById('checkoutStatus').textContent = 'Processing order...';
  document.getElementById('paypalButtonContainer').innerHTML = '';

  fetch('/api/submit-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name:name, email:email, phone:phone, address:address, city:city, state:state, zip:zip, products:products, total:total, note:'PayPal:'+paypalOrderId })
  }).then(function(r) { return r.json(); }).then(function(d) {
    if (d.success) {
      document.getElementById('checkoutStatus').textContent = 'Order placed! Thank you!';
      cart = [];
      saveCart();
      setTimeout(function() { closeCheckout(); }, 2000);
    } else {
      document.getElementById('checkoutStatus').textContent = 'Order failed: ' + (d.error || 'server error');
    }
  }).catch(function(e) {
    document.getElementById('checkoutStatus').textContent = 'Error: ' + e.message;
  });
}
