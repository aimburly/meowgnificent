var heroImages = [
  "images/hero-cat1.jpg","images/hero-cat2.jpg","images/hero-cat3.jpg",
  "images/hero-cat4.jpg","images/hero-cat5.jpg"
];

document.addEventListener('DOMContentLoaded', function() {
  initSlideshow(); renderCategories(); renderHotProducts(); setupCartUI();
});

function initSlideshow() {
  var c=document.getElementById('heroSlides');if(!c)return;
  for(var i=0;i<heroImages.length;i++){
    var d=document.createElement('div');
    d.className='hero-slide'+(i===0?' active':'');
    d.style.backgroundImage='url('+heroImages[i]+')';c.appendChild(d);
  }
  var cur=0;
  setInterval(function(){
    var s=c.children;s[cur].classList.remove('active');
    cur=(cur+1)%s.length;s[cur].classList.add('active');
  },5000);
}

function renderCategories() {
  var g=document.getElementById('categoryGrid');if(!g)return;
  g.innerHTML=categories.map(function(c){
    return '<div class="cat-card" onclick="location.href=\'category.html?cat='+c.id+'\'" style="--cat-color:'+c.color+'">'
      +'<div class="cat-card-icon"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="img-placeholder" style="display:none">'+c.emoji+'</span></div>'
      +'<div class="cat-card-body">'
      +'<h3 class="cat-card-name">'+c.name+'</h3>'
      +'<p class="cat-card-desc">'+c.desc+'</p>'
      +'<span class="cat-card-link" style="color:'+c.color+'">Shop '+c.name+' &rarr;</span>'
      +'</div></div>';
  }).join('');
}

function renderHotProducts() {
  var g=document.getElementById('hotGrid');if(!g)return;
  var picks=[products[0],products[1],products[3],products[6]];
  g.innerHTML=picks.map(function(p){
    var cat=categories.find(function(c){return c.id===p.cat;});
    return '<div class="hot-card" onclick="location.href=\'product.html?id='+p.id+'\'">'
      +'<div class="hot-card-img"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="img-placeholder">'+p.emoji+'</span></div>'
      +'<div class="hot-card-body">'
      +'<div class="hot-card-name">'+p.name+'</div>'
      +'<div class="hot-card-price">$'+p.price.toFixed(2)+'</div>'
      +'<div class="hot-card-cat">'+(cat?cat.name:'')+'</div>'
      +'</div></div>';
  }).join('');
}

function setupCartUI() {
  var b=document.getElementById('cartBtn'),o=document.getElementById('cartOverlay'),c=document.getElementById('cartClose'),k=document.getElementById('checkoutBtn');
  if(b)b.addEventListener('click',function(){o.classList.add('open');renderCart();});
  if(c)c.addEventListener('click',function(){o.classList.remove('open');});
  if(o)o.addEventListener('click',function(e){if(e.target===o)o.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&o)o.classList.remove('open');});
  if(k)k.addEventListener('click',handleCheckout);
}
function handleCheckout(){
  if(cart.length===0)return;
  alert('Order Summary:\n'+cart.map(function(i){return i.name+' x'+i.qty;}).join(', ')+'\n\nTotal: $'+getCartTotal().toFixed(2)+'\n\nDemo checkout');
}
function toggleFaq(btn){
  var item=btn.parentElement,isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el){if(el!==item)el.classList.remove('open');});
  if(isOpen)item.classList.remove('open');else item.classList.add('open');
}