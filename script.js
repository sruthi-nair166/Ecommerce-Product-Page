const menuBtn = document.querySelector(".logo-nav div button");
const menuLogo = document.querySelector(".logo-nav div button img")
const menu = document.querySelector(".logo-nav nav");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const overlay = document.querySelector(".overlay");
const productImage = document.querySelector(".product-image");
const imageWrapper = document.querySelector(".image-wrapper");
const cloneImageWrapper = document.querySelector(".clone");
const closeBtn = document.querySelector("#close");
const thumbnailsWrapper = document.querySelector(".thumbnails-wrapper");
const thumbnails = document.querySelectorAll(".thumbnail");
const minusBtn = document.querySelector(".counter button:first-child");
const plusBtn = document.querySelector(".counter button:last-of-type");
const qtyDisplay = document.querySelector(".counter span");
const cartIcon = document.querySelector("#cart-icon");
const cartTray = document.querySelector("#cart-tray");
const cartEmpty = document.querySelector(".cart-empty");
const cartBtn = document.querySelector("#cart-btn");
const productName = document.querySelector(".text h1");
const price = document.querySelector("#price");
const cartBadge = document.querySelector(".cart-badge");
const cartBadgeText = document.querySelector(".cart-badge span");


/* styling menu opening and closing in mobile layout */

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("show");
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
  
  if(menuBtn.classList.contains("show")) {
    menuLogo.setAttribute("src", "./images/icon-close.svg");
    prevBtn.style.display = "none";
    document.body.style.overflow = "hidden";
    menuBtn.setAttribute("aria-label", "close menu");
    menuBtn.setAttribute("aria-expanded", "true");
  } else {
    menuLogo.setAttribute("src", "./images/icon-menu.svg");
    prevBtn.style.display = "block";
    document.body.style.overflow = "";
    menuBtn.setAttribute("aria-label", "open menu");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* removing class show and reverting to default layout in case of screen resize */ 

window.addEventListener("resize", () => {
  if(window.innerWidth >= 850) {
    menuBtn.classList.remove("show");
    menu.classList.remove("show");
    overlay.classList.remove("show");

    menuLogo.setAttribute("src", "./images/icon-menu.svg");
    prevBtn.style.display = "";
    document.body.style.overflow = "";
  }
});

/* opening the lightbox */

function productImageClick() {
  let clone = cloneImageWrapper.querySelector(".image-wrapper");

  /* to prevent clone of imageWrapper from being created multiple times, and event listeners from being added too many times */
  if(!cloneImageWrapper.querySelector(".image-wrapper")) {
      clone = imageWrapper.cloneNode(true);
      cloneImageWrapper.appendChild(clone);

      const cloneProductImage = clone.querySelector(".product-image");
      const clonePrevBtn = clone.querySelector(".prev");
      const cloneNextBtn = clone.querySelector(".next");
      const thumbnailsClone = clone.querySelectorAll(".thumbnail");

      prevImage(cloneProductImage, clonePrevBtn, thumbnailsClone);
      nextImage(cloneProductImage, cloneNextBtn, thumbnailsClone);

      thumbnailSelector(thumbnailsClone, cloneProductImage);

      closeLightBox(cloneProductImage, thumbnailsClone);
    }

    const cloneProductImage = clone.querySelector(".product-image");
    const thumbnailsClone = clone.querySelectorAll(".thumbnail");

    /* to obtain current product Image and set the same in lightbox */
    const currentProductImg = productImage.dataset.img;

    imgSet(cloneProductImage, currentProductImg);
    thumbnailImgSet(thumbnailsClone, currentProductImg);

    overlay.classList.add("zoom");
    cloneImageWrapper.hidden = false;

    cloneImageWrapper.classList.add("zoom"); 
    cloneProductImage.classList.add("zoom");
    
    clone.querySelector(".prev").classList.add("zoom");
    clone.querySelector(".next").classList.add("zoom");
}

/* keydown for product image */

function productImageKeydown(e) {
  if(e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    productImageClick();
  }
}

/* adding event listener on desktop layout and removing it in mobile layout */

let isListenerAdded = false;

function productImageListener() {

  if(window.innerWidth >= 850 && !isListenerAdded) {
    productImage.addEventListener("keydown", productImageKeydown);
    productImage.addEventListener("click", productImageClick);
    isListenerAdded = true;

    productImage.setAttribute("role", "button");
    productImage.setAttribute("tabindex", "0");
    productImage.setAttribute("aria-label", "Open product image in full view");
  }
  else if(window.innerWidth < 850 && isListenerAdded) {
    productImage.removeEventListener("keydown", productImageKeydown);
    productImage.removeEventListener("click", productImageClick);
    isListenerAdded = false;

    productImage.removeAttribute("role");
    productImage.removeAttribute("tabindex");
    productImage.removeAttribute("aria-label");
    productImage.removeEventListener("keydown", productImageClick);
  }
}

productImageListener();
window.addEventListener("resize", productImageListener);

/* resetting product image to first image after closing light box */

function reset(image, tbn) {
  imgSet(image, "1");

  thumbnailImgSet(tbn, 1);
}

/* function for closing the lightbox */

function closeLightBox(clone, tbnClone) {
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("zoom");
    cloneImageWrapper.classList.remove("zoom");
    cloneImageWrapper.hidden = true;

    reset(clone, tbnClone);
    reset(productImage, thumbnails);
  });
};

function imgSet(img, num) {
  img.setAttribute("src", `./images/image-product-${num}.jpg`);
  img.setAttribute("data-img", `${num}`);
}

function thumbnailImgSet(tns, num) {
  tns.forEach(tn => tn.classList.remove("selected"));
  tns[Number(num)-1].classList.add("selected");
}

/* selecting images from the thumbnails */

function thumbnailSelector(tns, image) {
  tns.forEach(thumbnail => {
  thumbnail.addEventListener("click", event => {

    const number = event.currentTarget.dataset.img;

    imgSet(image, number);
    thumbnailImgSet(tns, number);
    })
  });
}

thumbnailSelector(thumbnails, productImage);


/* previous and next buttons functionality */

function prevImage(image, btn, tbn) {
  btn.addEventListener("click", () => {
    let currentProductImg = image.dataset.img;

    const prevImg = Number(currentProductImg) <= 1 ? 1 : Number(currentProductImg) - 1;

    imgSet(image, prevImg);

    if(thumbnailsWrapper.style.display !== "none") {
      thumbnailImgSet(tbn, prevImg);
    }
  }); 
}

function nextImage(image, btn, tbn) {
  btn.addEventListener("click", () => {
    let currentProductImg = image.dataset.img;

    const nextImg = Number(currentProductImg) >= 4 ? 4 : Number(currentProductImg) + 1;

    imgSet(image, nextImg);

    if(thumbnailsWrapper.style.display !== "none") {
      thumbnailImgSet(tbn, nextImg);
    }
  });
}

prevImage(productImage, prevBtn);
nextImage(productImage, nextBtn);

/* quantity of product(s) */

minusBtn.addEventListener("click", () => {
  let qty = Number(qtyDisplay.innerText);

  if(qty > 0) {
    qty--;
    qtyDisplay.innerText = `${qty}`;
  }
})

plusBtn.addEventListener("click", () => {
  let qty = Number(qtyDisplay.innerText);

  qty++;
  qtyDisplay.innerText = `${qty}`;
});

/* opening and closing the cart tray */

cartIcon.addEventListener("click", () => {
  cartTray.classList.toggle("open");
  
  const isOpen = cartTray.classList.contains("open");
  cartIcon.setAttribute("aria-expanded", String(isOpen));
});

/* add to cart functionality */

cartBtn.addEventListener("click", () => {
  const qty = Number(qtyDisplay.textContent);

  if(qty <= 0) {
    alert("No items to add");
  } 
  
  else {
    cartEmpty.classList.remove("empty");

    cartBadge.classList.add("fill");
    cartBadgeText.textContent = `${qty}`;

    const priceText = price.textContent;
    const total = Number(priceText) * qty;

    if(!cartTray.querySelector(".filled")) {
      const div = document.createElement("div");
      cartTray.appendChild(div);
      div.classList.add("filled");

      const imgUrl = `./images/image-product-1.jpg`;
      const delIconUrl = `./images/icon-delete.svg`;
      const productNameText = productName.textContent;

      div.innerHTML = `<div class="product">
                        <div>
                          <img src="${imgUrl}" class="img"/>
                          <div>
                            <span>${productNameText}</span>
                            <span>
                              <span class="sr-only">Individual price: </span>$${priceText} x
                            </span> 
                            <span class="qty">
                              <span class="sr-only">Quantity: </span>${qty}
                            </span>
                            <span id="total">
                              <span class="sr-only">Total: </span>$${total}
                            </span>
                          </div>
                        </div>
                        <button id="del-cart-btn"><img src="${delIconUrl}"/></button>
                      </div>
                      <button id="checkout" class="orange-btn">Checkout</button>`;

      /* cart deletion */

      const delCartBtn = document.querySelector("#del-cart-btn");

      delCartBtn.addEventListener("click", () => {
        div.remove();
        cartEmpty.classList.add("empty");
        qtyDisplay.textContent = "0";
        cartBadge.classList.remove("fill");
        cartBadgeText.textContent = "";
      });
    }

    else {
      document.querySelector(".qty").innerHTML = `<span class="sr-only">Quantity: </span>${qty}`;
      document.querySelector("#total").innerHTML = `<span class="sr-only">Total: </span>$${total}`;
    }
  } 
});

