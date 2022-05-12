const ship = document.getElementById("ship");
const prevship = document.getElementById("prev-ship");
const nextship = document.getElementById("next-ship");
const rotateBtn = document.getElementById("rotate-button");
const grid = document.querySelector("#grid");
const hideBtn = document.getElementById("hide-btn");

let gridRow;
for (let i = 65; i < 75; i = i + 1) {
  gridRow = String.fromCharCode(i);
  for (let j = 1; j < 11; j = j + 1) {
    let div = document.createElement("div");
    div.classList += "grid-block";
    div.setAttribute("value", `${gridRow}${j}`);
    grid.appendChild(div);
  }
}

let ships = {
  carrier: { size: 5, orientation: "H", coordinates: [] },
  battleship: { size: 4, orientation: "H", coordinates: [] },
  cruiser: { size: 3, orientation: "H", coordinates: [] },
  submarine: { size: 3, orientation: "H", coordinates: [] },
  destroyer: { size: 2, orientation: "H", coordinates: [] },
};
let hidden = false;
let count = 0;
let shipnames = Object.keys(ships);
let shiporientation = "H";
let selectedship = shipnames[count];
ships[selectedship].orientation = shiporientation;
ship.innerText = selectedship;

rotateBtn.addEventListener("click", rotateFunction);

function rotateFunction() {
  ship.classList.toggle("rotate");
  if (shiporientation == "H") {
    shiporientation = "V";
  } else {
    shiporientation = "H";
  }

  for (const details of Object.values(ships)) {
    if (details.coordinates.length == 0) {
      details.orientation = shiporientation;
    }
  }
}
prevship.addEventListener("click", () => {
  if (count > 0) {
    count--;
    selectShip();
  }
});

nextship.addEventListener("click", () => {
  if (count < shipnames.length - 1) {
    count++;
    selectShip();
  }
});

const gridBlocks = document.querySelectorAll(".grid-block");

for (const block of gridBlocks) {
  block.addEventListener("mouseover", () => {
    highlightBlocks.call(block);
  });
  block.addEventListener("mouseleave", () => {
    removeHighlightedBlocks.call(block);
  });
}

function highlightBlocks() {
  if (shipnames.length > 0 && !hidden) {
    const length = ships[selectedship].size;
    const orientation = ships[selectedship].orientation;
    const blockvalue = this.getAttribute("value");
    const row = Number(blockvalue.slice(0, 1).charCodeAt(0)) - 64;

    const column = Number(blockvalue.slice(1, length + 1));

    let currentblock = this;

    if (ships[selectedship].coordinates.length == 0) {
      if (orientation == "H") {
        if (10 - column >= length - 1) {
          let flag = true;
          for (let i = column; i < length + column; i = i + 1) {
            if (
              currentblock.classList.contains("br-grey") ||
              this.getAttribute("set") == "Y"
            ) {
              flag = false;

              break;
            } else {
              currentblock = currentblock.nextElementSibling;
            }
          }
          if (flag) {
            currentblock = this;
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(this, blockvalue);
            });
            for (let i = 0; i < length; i = i + 1) {
              currentblock.classList += " br-grey";
              currentblock = currentblock.nextElementSibling;
            }
          }
        }
      } else {
        //Vertical orientation
        if (10 - row >= length - 1) {
          let flag = true;
          for (let i = row; i < length + row; i = i + 1) {
            currentblock = document.querySelector(
              `[value="${String.fromCharCode(64 + i)}${column}"]`
            );
            if (
              currentblock.classList.contains("br-grey") ||
              this.getAttribute("set") == "Y"
            ) {
              flag = false;

              break;
            }
          }

          if (flag) {
            currentblock = this;
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(this);
            });
            for (let i = row; i < length + row; i = i + 1) {
              currentblock = document.querySelector(
                `[value="${String.fromCharCode(64 + i)}${column}"]`
              );
              currentblock.classList += " br-grey";
            }
          }
        }
      }
    }
  }
}

function removeHighlightedBlocks() {
  if (shipnames.length > 0) {
    const length = ships[selectedship].size;
    const column = Number(this.getAttribute("value").slice(1, length + 1));
    const row =
      Number(this.getAttribute("value").slice(0, 1).charCodeAt(0)) - 64;

    let currentblock = this;

    if (currentblock.getAttribute("set") != "Y") {
      if (ships[selectedship].orientation == "H") {
        for (let i = 0; i < length; i = i + 1) {
          if (currentblock.classList.contains("br-grey")) {
            currentblock.classList.remove("br-grey");
            currentblock = currentblock.nextElementSibling;
          }
        }
      } else {
        console.log("here");
        //Vertical
        if (10 - row >= length - 1) {
          for (let i = row; i < length + row; i = i + 1) {
            currentblock = document.querySelector(
              `[value="${String.fromCharCode(64 + i)}${column}"]`
            );
            if (
              currentblock.getAttribute("set") != "Y" &&
              currentblock.classList.contains("br-grey")
            ) {
              currentblock.classList.remove("br-grey");
              // console.log("Removing:" + currentblock.getAttribute("value"));
            }
          }
        }
      }
    }
  }
}
function selectCoordinates() {
  const length = ships[selectedship].size;
  // console.log("Length inside sc:" + length);
  const blockvalue = this.getAttribute("value");
  const orientation = ships[selectedship].orientation;
  const column = Number(this.getAttribute("value").slice(1, length + 1));
  const row = Number(this.getAttribute("value").slice(0, 1).charCodeAt(0)) - 64;
  if (shipnames.length > 0) {
    let flag = true;
    for (const ship of Object.values(ships)) {
      for (coordinate of ship.coordinates) {
        if (blockvalue == coordinate) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      let currentblock = this;

      if (orientation === "H") {
        // console.log(this);
        // setShip(blockvalue);
        for (let i = 0; i < length; i = i + 1) {
          ships[selectedship].coordinates.push(
            currentblock.getAttribute("value")
          );
          // console.log(
          //   "pushing:" +
          //     currentblock.getAttribute("value") +
          //     "to" +
          //     selectedship
          // );
          currentblock.setAttribute("set", "Y");

          currentblock = currentblock.nextElementSibling;
        }
      } else {
        for (let i = row; i < length + row; i = i + 1) {
          currentblock = document.querySelector(
            `[value="${String.fromCharCode(64 + i)}${column}"]`
          );
          ships[selectedship].coordinates.push(
            currentblock.getAttribute("value")
          );
          // console.log(
          //   "pushing:" +
          //     currentblock.getAttribute("value") +
          //     "to" +
          //     selectedship
          // );
          currentblock.setAttribute("set", "Y");
        }
      }
      setShip(blockvalue);

      shipnames.splice(shipnames.indexOf(selectedship), 1);
      if (count > shipnames.length - 1) {
        count = shipnames.length - 1;
      }

      selectShip();
    }
  }
}

const selectShip = () => {
  selectedship = shipnames[count];
  if (count == -1) {
    ship.innerText = "all selected";
    if (shiporientation == "V") ship.classList.toggle("rotate");
    rotateBtn.removeEventListener("click", rotateFunction);
    hideShips();
  } else {
    ship.innerText = selectedship;
  }
};

const setShip = (blockvalue) => {
  const block = document.querySelector(`[value="${blockvalue}"]`);

  const height =
    ships[selectedship].orientation == "H"
      ? block.offsetHeight
      : ships[selectedship].size * block.offsetHeight +
        (ships[selectedship].size - 1) * 5;
  const width =
    ships[selectedship].orientation == "H"
      ? ships[selectedship].size * block.offsetWidth +
        (ships[selectedship].size - 1) * 5
      : block.offsetHeight;

  let div = document.createElement("div");
  if (ships[selectedship].orientation == "H") {
    div.innerText = selectedship;
  } else {
    for (letter of selectedship) {
      let p = document.createElement("p");

      p.innerText = letter;
      div.appendChild(p);
    }
  }
  div.style.flexDirection =
    ships[selectedship].orientation == "H" ? "row" : "column";
  div.classList += " set";
  div.style.padding.top = 5 + "px";
  div.style.height = height + "px";
  div.style.width = width + "px";
  div.style.top = `${block.offsetTop}px`;
  div.style.left = `${block.offsetLeft}px`;
  if (selectedship == "destroyer") {
    div.style.flexDirection = "row";
  }
  grid.appendChild(div);
};

const hideShips = () => {
  hidden = hidden ? false : true;
  for (const ship of Object.values(ships)) {
    for (coordinate of ship.coordinates) {
      document
        .querySelector(`[value="${coordinate}"]`)
        .classList.remove("br-grey");
    }
  }
};

hideBtn.addEventListener("click", (e) => {
  hideShips();
  const divs = document.querySelectorAll(".set");
  if (hideBtn.innerText.startsWith("H")) {
    hideBtn.innerText = "Show";
  } else {
    hideBtn.innerText = "Hide";
  }
  for (div of divs) {
    div.classList.toggle("d-none");
  }
});
