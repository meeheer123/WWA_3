const data = [
    {
      id: 1,
      name: "Appartment 1",
      img: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=2048x2048&w=is&k=20&c=akMilTSxEYajbopSGMQTatLQR2XXgt6-2ncfToyQ0eI=",
      amt: 100000,
      seller: "Bombay",
      catagory: "4bhk",
    },
  
    {
      id: 2,
      name: "Appartment 2",
      img: "https://media.istockphoto.com/id/1322575582/photo/exterior-view-of-modern-apartment-building-offering-luxury-rental-units-in-silicon-valley.jpg?s=2048x2048&w=is&k=20&c=dW_OrTouBOaSjW1TLyLdY3cgksL1EdpV90Siecr_4n0=",
      amt: 10000,
      seller: "Bombay",
      catagory: "3bhk",
    },
  
    {
      id: 3,
      name: "Appartment 3",
      img: "https://media.istockphoto.com/id/1177797403/photo/modern-apartment-buildings-on-a-sunny-day-with-a-blue-sky.jpg?s=2048x2048&w=is&k=20&c=FlJtLqUTUWtG9jD5aSVqA0hlf8NWzF1RdRVrFFJ6ho4=",
      amt: 20000,
      seller: "Bombay",
      catagory: "3bhk",
    },
    {
      id: 4,
      name: "Appartment 4",
      img: "https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=2048x2048&w=is&k=20&c=ecn5rDY4T5q7asEVczuq5tGAv5G0zahOXtTa8OaogzY=",
      amt: 20000,
      seller: "Bombay",
      catagory: "2bhk",
    },
  
  ];
  
  const productsContainer = document.querySelector(".products");
  const categoryList = document.querySelector(".category-list");
  
  function displayProducts(products) {
    if (products.length > 0) {
      const product_details = products
        .map(
          (product) => `
    <div class="product">
    <div class="img">
      <img src="${product.img}" alt="${product.name}" />
    </div>
    <div class="product-details">
      <span class="name">${product.name}</span>
      <span class="amt">Rs.${product.amt}</span>
      <span class="seller">${product.seller}</span>
    </div>
  </div>`
        )
        .join("");
  
      productsContainer.innerHTML = product_details;
    } else {
      productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
  }
  
  function setCategories() {
    const allCategories = data.map((product) => product.catagory);
    //console.log(allCategories);
    const catagories = [
      "All",
      ...allCategories.filter((product, index) => {
        return allCategories.indexOf(product) === index;
      }),
    ];
    //console.log(catagories);
    categoryList.innerHTML = catagories.map((catagory) => `<li>${catagory}</li>`).join("");
  
    categoryList.addEventListener("click", (e) => {
      const selectedCatagory = e.target.textContent;
      selectedCatagory === "All" ? displayProducts(data) : displayProducts(data.filter((product) => product.catagory == selectedCatagory));
    });
  }
  const priceRange = document.querySelector("#priceRange");
  const priceValue = document.querySelector(".priceValue");
  
  function setPrices() {
    const priceList = data.map((product) => product.amt);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceValue.textContent = "Rs." + maxPrice;
  
    priceRange.addEventListener("input", (e) => {
      priceValue.textContent = "Rs." + e.target.value;
      displayProducts(data.filter((product) => product.amt <= e.target.value));
    });
  }
  
  const txtSearch = document.querySelector("#txtSearch");
  txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
      displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
    } else {
      displayProducts(data);
    }
  });
  
  displayProducts(data);
  setCategories();
  setPrices();
