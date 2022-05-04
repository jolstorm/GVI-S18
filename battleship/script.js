const rotateBtn = document.getElementById("rotate-button");
const ship = document.getElementById("ship");
rotateBtn.addEventListener("click", () => {
  ship.classList.toggle("rotate");
});
ship.addEventListener("dragstart", (e) => {
  //   e.preventDefault();
  console.log("DragStart");
});
ship.addEventListener("dragend", (e) => {
  //   e.preventDefault();
  console.log("Dragend");
});

const gridBlocks = document.querySelectorAll(".grid-block");
for (const block of gridBlocks) {
  block.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragover.call(this);
  });
  block.addEventListener("dragleave", dragleave);
}

function dragover(block) {
  console.log(block);
  //   e.preventDefault();
  if (this.classList.contains("br-grey")) {
    // console.log("yes");
    return;
  } else {
    this.classList += " br-grey";
  }
}

function dragleave(e) {
  //   e.preventDefault();
  this.classList.remove("br-grey");
}
