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
console.log(window.innerWidth);
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
console.log(nav);
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

for (const bookmark of bookmarks) {
  bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("bookmarked");
  });
}

for (const like of likes) {
  like.addEventListener("click", () => {
    like.classList.toggle("liked");
  });
}

document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector(".ddmenu-wrapper").classList += " show";
  document.querySelector(".shade").classList += " dark";
});

document.querySelector("#close i").addEventListener("click", () => {
  document.querySelector(".ddmenu-wrapper").classList.remove("show");
  document.querySelector(".shade").classList.remove("dark");
});
