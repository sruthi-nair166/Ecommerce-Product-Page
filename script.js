const menuBtn = document.querySelector(".logo-nav div button");
const menuLogo = document.querySelector(".logo-nav div button img")
const menu = document.querySelector(".logo-nav nav");
const prevBtn = document.querySelector(".prev");
const overlay = document.querySelector(".overlay");
const productImage = document.querySelector(".product-image");
const imageWrapper = document.querySelector(".image-wrapper");
const cloneImageWrapper = document.querySelector(".clone");
const closeBtn = document.querySelector(".close");


/* styling menu opening and closing in mobile layout */

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("show");
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
  
  if(menuBtn.classList.contains("show")) {
    menuLogo.setAttribute("src", "./images/icon-close.svg");
    prevBtn.style.display = "none";
    document.body.style.overflow = "hidden";
  } else {
    menuLogo.setAttribute("src", "./images/icon-menu.svg");
    prevBtn.style.display = "block";
    document.body.style.overflow = "";
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
  if(!cloneImageWrapper.querySelector(".image-wrapper")) {
      const clone = imageWrapper.cloneNode(true);
      cloneImageWrapper.appendChild(clone);

      const clonePrevBtn = clone.querySelector(".prev");
      const cloneNextBtn = clone.querySelector(".next");
      clonePrevBtn.classList.add("zoom");
      cloneNextBtn.classList.add("zoom");
    }

    overlay.classList.add("zoom");

    cloneImageWrapper.classList.add("zoom");

    const cloneProductImage = clone.querySelector(".product-image");
    cloneProductImage.classList.add("zoom");
}

/* adding event listener on desktop layout and removing it in mobile layout */

let isListenerAdded = false;

function productImageListener() {

  if(window.innerWidth >= 850 && !isListenerAdded) {
    productImage.addEventListener("click", productImageClick);
    isListenerAdded = true;
  }
  else if(window.innerWidth < 850 && isListenerAdded) {
    productImage.removeEventListener("click", productImageClick);
    isListenerAdded = false;
  }
}

productImageListener();
window.addEventListener("resize", productImageListener);

/* closing the lightbox */

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("zoom");
  cloneImageWrapper.classList.remove("zoom");
})



