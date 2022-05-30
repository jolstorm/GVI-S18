let current = 1;
let prev = 1;
let interval = 3;
const products = document.querySelectorAll("#hero .products-cont .product");
products[current].lastElementChild.classList += " selected";
const heroImgs = document.getElementsByClassName("hero-images");
const bookmarks = document.querySelectorAll(".bookmark");
console.log(window.innerWidth);
let change = setInterval(check, interval * 1000);

function check() {
  products[current ? current - 1 : 2].lastElementChild.classList.remove(
    "selected"
  );
  products[current].lastElementChild.classList += " selected";
  heroImgs[current ? current - 1 : 2].style.opacity = "0";
  heroImgs[current].style.opacity = "1";
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
    heroImgs[index].style.opacity = "1";

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

for (const bookmark of bookmarks) {
  bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("bookmarked");
  });
}
