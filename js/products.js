var categories = [
  { id: "toys", name: "Cat Toys", img: "images/cat-toys.jpg", emoji: "\uD83E\uDEB6", color: "#ed6835", desc: "Wands, teasers, crinkle balls & more" },
  { id: "scratching", name: "Scratching", img: "images/cat-scratching.jpg", emoji: "\uD83E\uDEB5", color: "#108474", desc: "Boards, pads & posts" },
  { id: "grooming", name: "Grooming & Care", img: "images/cat-grooming.jpg", emoji: "\uD83E\uDEAE", color: "#d9467a", desc: "Brushes, nail care & cleaning supplies" },
  { id: "nailcare", name: "Nail Care", img: "images/cat-nailcare.jpg", emoji: "\u2702\uFE0F", color: "#5b6abf", desc: "Clippers, grinders & scratch guards" }
];

var products = [
  // Toys
  { id: 1, cat: "toys", name: "Feather Wand Toy", price: 9.99, desc: "Colorful feathers on a sturdy string.", img: "images/feather-wand.jpg", emoji: "\uD83E\uDEB6" },
  { id: 2, cat: "toys", name: "Catnip Plush Mouse (3-Pack)", price: 12.99, desc: "Organic catnip stuffed mice.", img: "images/catnip-mouse.jpg", emoji: "\uD83D\uDC2D" },
  { id: 3, cat: "toys", name: "Crinkle Ball Set (6-Pack)", price: 7.99, desc: "Lightweight crinkle balls.", img: "images/crinkle-ball.jpg", emoji: "\u26A1" },
  { id: 4, cat: "toys", name: "Interactive Feather Teaser", price: 14.99, desc: "Long-reach wand with attachments.", img: "images/feather-teaser.jpg", emoji: "\u2728" },
  // Scratching
  { id: 5, cat: "scratching", name: "Cat Scratcher Board", price: 14.99, desc: "Premium corrugated cardboard.", img: "images/scratch-board.jpg", emoji: "\uD83D\uDCE6" },
  { id: 6, cat: "scratching", name: "Sisal Scratch Pad", price: 18.99, desc: "Durable mat for floors or walls.", img: "images/scratch-pad.jpg", emoji: "\uD83D\uDFE4" },
  { id: 7, cat: "scratching", name: "Cat Scratching Post", price: 29.99, desc: "Sturdy post wrapped in sisal rope.", img: "images/scratch-post.jpg", emoji: "\uD83D\uDDFC" },
  // Grooming & Care (merged)
  { id: 8, cat: "grooming", name: "Self-Grooming Brush", price: 8.99, desc: "Corner brush for self-grooming.", img: "images/self-brush.jpg", emoji: "\uD83D\uDD04" },
  { id: 9, cat: "grooming", name: "Deshedding Glove", price: 14.99, desc: "Remove loose fur while petting.", img: "images/deshed-glove.jpg", emoji: "\uD83E\uDDE4" },
  { id: 10, cat: "grooming", name: "Cat Comb Fine Tooth", price: 7.99, desc: "Gentle comb for all coat types.", img: "images/cat-comb.jpg", emoji: "\uD83E\uDEAE" },
  { id: 11, cat: "grooming", name: "Litter Scoop XL", price: 6.99, desc: "Extra-wide slotted scoop.", img: "images/litter-scoop.jpg", emoji: "\uD83E\uDD44" },
  { id: 12, cat: "grooming", name: "Pet Stain Remover", price: 12.99, desc: "Enzymatic cleaner for carpets.", img: "images/stain-remover.jpg", emoji: "\uD83E\uDDF4" },
  { id: 13, cat: "grooming", name: "Litter Mat Large", price: 15.99, desc: "Double-layer mesh trap mat.", img: "images/litter-mat.jpg", emoji: "\uD83D\uDD32" },
  // Nail Care
  { id: 14, cat: "nailcare", name: "Cat Nail Clippers", price: 9.99, desc: "Safety-guard clippers.", img: "images/nail-clipper.jpg", emoji: "\u2702\uFE0F" },
  { id: 15, cat: "nailcare", name: "Nail Grinder Kit", price: 19.99, desc: "Quiet rechargeable grinder.", img: "images/nail-grinder.jpg", emoji: "\uD83D\uDD27" }
];

function getProductsByCategory(catId) {
  if (!catId || catId === "all") return products;
  return products.filter(function(p) { return p.cat === catId; });
}
function getProduct(id) {
  return products.find(function(p) { return p.id === parseInt(id); });
}
function getCategory(id) {
  return categories.find(function(c) { return c.id === id; });
}
