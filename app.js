let totalClicks = 0;
let maxClicks = 5;

// call the contructor Product

function Product(name, src, clicks, views) {
  this.name = name;
  this.src = src;
  this.clicks = clicks;
  this.views = views;
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

if (localStorage.getItem("productData") === null) {
  for (let i = 0; i < productNames.length; i++) {
    new Product(productNames[i], `images/${productNames[i]}.jpeg`, 0, 0);
  }
} else {
  const productData = JSON.parse(localStorage.getItem("productData"));
  for (let i = 0; i < productData.length; i++) {
    new Product(
      productData[i].name,
      productData[i].src,
      productData[i].clicks,
      productData[i].views
    );
  }
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

  // retrieve our image elements
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  // change the src attribute of img1, img2 & img3 to be the src from our random products
  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;

  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;

  // increase the views for the three products we are looking at
  Product.allProducts[index1].views++;
  Product.allProducts[index2].views++;
  Product.allProducts[index3].views++;
}

// increase the clicks on the clicked Product object (for loop and clicks++)(check the event.target.alt)

function handleClick(event) {
  // check if the thing we clicked on is the container (as aposed to an image)
  if (event.target === imgContainer) {
    alert("Please click one of the images, not inbetween the images.");
    return; // this return stops the function
  }

  // check every single products "name" against the alt tag of the target, and increase the clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break; // stop the loop, because we found our product
    }
  }

  // each time we click we need to increase totalClicks
  // we need to check if we've reached the maximum number of clicks allowed
  // if we have, don't render more images, and remove the eventlistener on the image container
  // we we haven't, render more images
  totalClicks++;
  if (totalClicks === maxClicks) {
    alert("Thank you for voting!");
    imgContainer.removeEventListener("click", handleClick);
    const productsStr = JSON.stringify(Product.allProducts);
    localStorage.setItem("productData", productsStr);

    renderChart();
    return; // end the function
  }

  // get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };
  new Chart(myChart, config);
}

// render the inital images
renderImages();
