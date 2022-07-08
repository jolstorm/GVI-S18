let current = 1;
let prev = 1;
let interval = 3;
const products = document.querySelectorAll("#hero .products-cont .product");
products[current].lastElementChild.classList += " selected";
const heroImgs = document.getElementsByClassName("hero-images");
const likes = document.getElementsByClassName("heart-circle");
const bookmarks = document.querySelectorAll(".bookmark");
const content = document.querySelectorAll(".content");
content[1].style.opacity = "1";
let change = setInterval(check, interval * 1000);
const spcd = document.querySelectorAll(".single-product-card .product-details");
function check() {
  products[current ? current - 1 : 2].lastElementChild.classList.remove(
    "selected"
  );
  products[current].lastElementChild.classList += " selected";
  heroImgs[current ? current - 1 : 2].style.opacity = "0";
  heroImgs[current].style.opacity = "1";
  content[current ? current - 1 : 2].style.opacity = "0";
  content[current].style.opacity = "1";
  spcd[current ? current - 1 : 2].style.opacity = "0";
  spcd[current].style.opacity = "1";
  prev = current;
  current++;
  if (current == heroImgs.length) {
    current = 0;
  }
}

products.forEach((product, index) => {
  product.addEventListener("click", () => {
    clearInterval(change);

    products[prev].lastElementChild.classList.remove("selected");
    product.lastElementChild.classList += " selected";
    heroImgs[prev].style.opacity = "0";
    content[prev].style.opacity = "0";
    heroImgs[index].style.opacity = "1";
    content[index].style.opacity = "1";
    spcd[prev].style.opacity = "0";
    spcd[index].style.opacity = "1";

    current = index;
    prev = index;
    change = setInterval(check, interval * 1000);
  });
});

const nav = document.querySelectorAll("nav a");
for (const a of nav) {
  if (!a.hasAttribute("id")) {
    a.addEventListener("mouseover", () => {
      a.classList += " hov";
    });
    a.addEventListener("mouseleave", () => {
      a.classList.remove("hov");
    });
  }
}

//Normal Method

// for (const bookmark of bookmarks) {
//   bookmark.addEventListener("click", () => {
//     bookmark.classList.toggle("bookmarked");
//   });
// }

// for (const like of likes) {
//   like.addEventListener("click", () => {
//     like.classList.toggle("liked");
//   });
// }

//event bubbling and delegation
document.getElementById("blog").addEventListener("click", (e) => {
  if (e.target.classList.contains("bookmark")) {
    e.target.classList.toggle("bookmarked");
  }
  if (e.target.classList.contains("fa-bookmark")) {
    e.target.parentNode.classList.toggle("bookmarked");
  }
});

document.querySelector(".products").addEventListener("click", (e) => {
  if (e.target.classList.contains("heart-circle")) {
    e.target.classList.toggle("liked");
  }
  if (e.target.classList.contains("fa-heart")) {
    e.target.parentNode.classList.toggle("liked");
  }
});

document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector(".ddmenu-wrapper").classList += " show";
  document.querySelector(".shade").classList += " dark";
});

document.querySelector("#close i").addEventListener("click", () => {
  document.querySelector(".ddmenu-wrapper").classList.remove("show");
  document.querySelector(".shade").classList.remove("dark");
});

const sections = document.querySelectorAll("section+section");

let options = {
  root: null,
  rootMargin: "0px",
  threshold: calculateThreshold(),
};
let count = 0;
let callback = (entries, observer) => {
  console.log("yolo");
  const [entry] = entries;
  if (count == 0) {
    count++;
    return;
  }
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
let observer = new IntersectionObserver(callback, options);
sections.forEach((section) => {
  console.log("hiding section");
  section.classList.add("section--hidden");
  observer.observe(section);
});

function calculateThreshold() {
  console.log("CYolo");
  let width = window.innerWidth;
  if (width <= 425) {
    return 0.01;
  } else if (width > 425 && width <= 768) {
    return 0.02;
  } else {
    return 0.05;
  }
}
