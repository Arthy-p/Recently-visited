(function () {
  console.log("Recently Viewed Script Loaded");

  const STORAGE_KEY = "recentProducts";

  // =========================
  // 🧠 GET PRODUCT DETAILS
  // =========================
  function getProductDetails() {
    const title = document.querySelector("#productTitle")?.innerText?.trim();
    const price = document.querySelector(".a-price .a-offscreen")?.innerText;
    const image = document.querySelector("#imgTagWrapperId img")?.src;

    const match = window.location.pathname.match(/\/dp\/([A-Z0-9]+)/);
    const id = match ? match[1] : null;

    if (!id) return null;

    const url = window.location.origin + "/dp/" + id;

    return { id, title, price, image, url };
  }

  // =========================
  // 💾 SAVE PRODUCT 
  // =========================
  function saveProduct(product) {
    if (!product || !product.id) return;

    let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    products = [product, ...products.filter(p => p.id !== product.id)];

    products = products.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  // =========================
  // 🔁 TRACK PRODUCT PAGE 
  // =========================
  function trackProductPage() {
    let attempts = 0;

    const interval = setInterval(() => {
      const product = getProductDetails();

      if (product && product.title && product.image) {
        saveProduct(product);
        clearInterval(interval);
      }

      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 500);
  }

  // =========================
  // 🔄 HANDLE SPA NAVIGATION 
  // =========================
  let lastUrl = location.href;

  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;

      if (location.pathname.includes("/dp/")) {
        trackProductPage();
      }

      if (location.pathname === "/") {
        setTimeout(renderRecentlyViewed, 1000);
      }
    }
  }, 800);

  // =========================
  // 🎨 RENDER UI
  // =========================
  function renderRecentlyViewed() {
    if (document.querySelector(".rv-container")) return;

    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (!products.length) return;

    const container = document.createElement("div");
    container.className = "rv-container";

    const titleHeading = document.createElement("h2");
    titleHeading.innerText = "Recently Viewed";

    const list = document.createElement("div");
    list.className = "rv-list";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "rv-card";

      const img = document.createElement("img");
      img.src = product.image;

      const title = document.createElement("p");
      title.innerText = product.title;

      const price = document.createElement("p");
      price.innerText = product.price;

      const button = document.createElement("button");
      button.innerText = "View Product Details";

      const goToProduct = () => {
        saveProduct(product); // 🔥 FIX
        setTimeout(() => {
          window.location.href = product.url;
        }, 100);
      };

      img.onclick = goToProduct;
      title.onclick = goToProduct;
      button.onclick = goToProduct;

      const bottom = document.createElement("div");
      bottom.appendChild(price);
      bottom.appendChild(button);

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(bottom);

      list.appendChild(card);
    });

    // =========================
    // 🎯 CAROUSEL
    // =========================
    const wrapper = document.createElement("div");
    wrapper.className = "rv-wrapper";

    const leftBtn = document.createElement("button");
    leftBtn.innerHTML = "&#8249;";
    leftBtn.className = "rv-arrow left";

    const rightBtn = document.createElement("button");
    rightBtn.innerHTML = "&#8250;";
    rightBtn.className = "rv-arrow right";

    wrapper.appendChild(leftBtn);
    wrapper.appendChild(list);
    wrapper.appendChild(rightBtn);

    container.appendChild(titleHeading);
    container.appendChild(wrapper);

    injectIntoAmazon(container);

    setTimeout(() => {
      const card = list.querySelector(".rv-card");
      if (!card) return;

      const scrollAmount = card.offsetWidth + 12;

      leftBtn.onclick = () => {
        list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      };

      rightBtn.onclick = () => {
        list.scrollBy({ left: scrollAmount, behavior: "smooth" });
      };
    }, 300);
  }

  // =========================
  // 📌 INJECTION
  // =========================
  function injectIntoAmazon(container) {
    let attempts = 0;

    const interval = setInterval(() => {
      const target = document.querySelector("#gwm-dashboard-container");

      if (target) {
        target.after(container);
        clearInterval(interval);
      }

      attempts++;
      if (attempts > 10) {
        document.body.prepend(container);
        clearInterval(interval);
      }
    }, 400);
  }

  // =========================
  // 🚀 INITIAL LOAD
  // =========================
  if (location.pathname.includes("/dp/")) {
    trackProductPage();
  }

  if (location.pathname === "/") {
    setTimeout(renderRecentlyViewed, 1500);
  }

})();
