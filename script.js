const menuBtn = document.querySelector(".logo-nav div button");
const menuLogo = document.querySelector(".logo-nav div button img")
const menu = document.querySelector(".logo-nav nav");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const overlay = document.querySelector(".overlay");
const productImage = document.querySelector(".product-image");
const imageWrapper = document.querySelector(".image-wrapper");
const cloneImageWrapper = document.querySelector(".clone");
const closeBtn = document.querySelector(".close");
const thumbnailsWrapper = document.querySelector(".thumbnails-wrapper");
const thumbnails = document.querySelectorAll(".thumbnail");


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

    cloneImageWrapper.classList.add("zoom"); 
    cloneProductImage.classList.add("zoom");
    
    clone.querySelector(".prev").classList.add("zoom");
    clone.querySelector(".next").classList.add("zoom");
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

function prev(num) {
  let number = Number(num);

  if(number <= 1) return "1";
  return String(number - 1);
}

function next(num) {
  let number = Number(num);

  if(number >= 4) return "4";
  return String(number + 1);
}

function prevImage(image, btn, tbn) {
  btn.addEventListener("click", () => {
    let currentProductImg = image.dataset.img;

    const prevImg = prev(currentProductImg);

    imgSet(image, prevImg);

    if(thumbnailsWrapper.style.display !== "none") {
      thumbnailImgSet(tbn, prevImg);
    }
  }); 
}

function nextImage(image, btn, tbn) {
  btn.addEventListener("click", () => {
    let currentProductImg = image.dataset.img;

    const nextImg = next(currentProductImg);

    imgSet(image, nextImg);

    if(thumbnailsWrapper.style.display !== "none") {
      thumbnailImgSet(tbn, nextImg);
    }
  });
}

prevImage(productImage, prevBtn);
nextImage(productImage, nextBtn);



