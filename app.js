function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];
for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpeg`);
}

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}
function renderImages() {
  let index1 = randomProductIndex();
  let index2 = randomProductIndex();
  let index3 = randomProductIndex();

  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomProductIndex();
    index3 = randomProductIndex();
  }
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;
  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;
}
renderImages();

function handleClick(event) {
  if (event.target === imgContainer) {
    alert("Please click one of the images , not inbetween the images .");
    return;
  }
  for (let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i]);
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break;
    }
  }
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);
