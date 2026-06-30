document.addEventListener('DOMContentLoaded', function() {
  var p=new URLSearchParams(window.location.search),catId=p.get('cat')||'toys',cat=getCategory(catId);
  if(!cat){window.location.href='index.html';return;}
  document.title=cat.name+' - Meowgnificent';
  document.getElementById('catTitle').textContent=cat.name;
  document.getElementById('catDesc').textContent=cat.desc;
  document.querySelector('.cat-header').style.background='color-mix(in srgb,'+cat.color+' 12%,transparent)';

  var items=getProductsByCategory(catId);
  var container=document.getElementById('altProductList');
  container.innerHTML=items.map(function(p,i){
    return '<div class="alt-item">'
      +'<div class="alt-image" onclick="location.href=\'product.html?id='+p.id+'\'">'
      +'<img src="'+p.img+'" alt="'+p.name+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'
      +'<span class="img-placeholder">'+p.emoji+'</span>'
      +'</div>'
      +'<div class="alt-info">'
      +'<div class="alt-tag">'+cat.name+'</div>'
      +'<h3>'+p.name+'</h3>'
      +'<p>'+p.desc+'</p>'
      +'<div class="alt-price">$'+p.price.toFixed(2)+'</div>'
      +'<button class="btn btn-primary" onclick="location.href=\'product.html?id='+p.id+'\'">View Product</button>'
      +'</div></div>';
  }).join('');

  updateCartBadge();updateCheckoutBtn();setupCartUI2();
});

function setupCartUI2(){
  document.getElementById('cartBtn')?.addEventListener('click',function(){document.getElementById('cartOverlay').classList.add('open');renderCart();});
  document.getElementById('cartClose')?.addEventListener('click',function(){document.getElementById('cartOverlay').classList.remove('open');});
  document.getElementById('cartOverlay')?.addEventListener('click',function(e){if(e.target===document.getElementById('cartOverlay'))document.getElementById('cartOverlay').classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.getElementById('cartOverlay')?.classList.remove('open');});
  document.getElementById('checkoutBtn')?.addEventListener('click',handleCheckout2);
}
function handleCheckout2(){
  if(cart.length===0)return;
  alert('Order Summary:\n'+cart.map(function(i){return i.name+' x'+i.qty;}).join(', ')+'\n\nTotal: $'+getCartTotal().toFixed(2)+'\n\nDemo checkout');
}