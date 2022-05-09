const ship = document.getElementById("ship");
const prevship = document.getElementById("prev-ship");
const nextship = document.getElementById("next-ship");
const rotateBtn = document.getElementById("rotate-button");

let ships = {
  carrier: { size: 5, orientation: "H", coordinates: [] },
  battleship: { size: 4, orientation: "H", coordinates: [] },
  cruiser: { size: 3, orientation: "H", coordinates: [] },
  submarine: { size: 3, orientation: "H", coordinates: [] },
  destroyer: { size: 2, orientation: "H", coordinates: [] },
};

let count = 0;
let shipnames = Object.keys(ships);
let shiporientation = "H";
let selectedship = shipnames[count];
ships[selectedship].orientation = shiporientation;
ship.innerText = selectedship;

rotateBtn.addEventListener("click", () => {
  ship.classList.toggle("rotate");
  if (shiporientation == "H") {
    shiporientation = "V";
  } else {
    shiporientation = "H";
  }

  //Whenever orientation is changed change the orientation of all the unselected ships
  //Take shipnames and object.keys from ships and whichever don't match or
  //the ship whose coordinates aren't set
  //Right now, the orientation of only one ship is being changed
  console.log(shiporientation);
  ships[selectedship].orientation = shiporientation;
  // console.log(ships[selectedship].orientation);
});

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
  if (shipnames.length > 0) {
    const length = ships[selectedship].size;
    const orientation = ships[selectedship].orientation;
    const blockvalue = this.getAttribute("value");
    const row = Number(blockvalue.slice(0, 1).charCodeAt(0)) - 64;
    console.log(row);
    let flag = true;
    const column = Number(blockvalue.slice(1, length + 1));

    let currentblock = this;

    if (ships[selectedship].coordinates.length == 0) {
      if (orientation == "H") {
        if (10 - column >= length - 1) {
          for (let i = column; i < length + column; i = i + 1) {
            if (currentblock.classList.contains("br-grey")) {
              console.log(currentblock);
              flag = false;

              break;
            } else {
              currentblock = currentblock.nextElementSibling;
            }
          }
          // console.log(`Flag=${flag}`);
          if (flag) {
            currentblock = this;
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(this, length, orientation, blockvalue);
            });
            for (let i = 0; i < length; i = i + 1) {
              // console.log(currentblock.getAttribute("value"));
              currentblock.classList += " br-grey";
              currentblock = currentblock.nextElementSibling;
            }
          }
        }
      } else {
        //Vertical orientation
        if (10 - row >= length - 1) {
          for (let i = row; i < length + row; i = i + 1) {
            if (currentblock.classList.contains("br-grey")) {
              console.log(currentblock);
              flag = false;

              break;
            } else {
              currentblock = document.querySelector(
                `[value="${String.fromCharCode(64 + i)}${column}"]`
              );
            }
          }
          if (flag) {
            currentblock = this;
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(this, length, orientation, blockvalue);
            });
            for (let i = 0; i < length; i = i + 1) {
              currentblock = document.querySelector(
                `[value="${String.fromCharCode(64 + i + 1)}${column}"]`
              );
              currentblock.classList += " br-grey";
              console.log(currentblock.getAttribute("value"));
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
    let currentblock = this;

    if (!currentblock.getAttribute("disabled")) {
      for (let i = 0; i < length; i = i + 1) {
        if (currentblock.classList.contains("br-grey")) {
          // console.log(currentblock);
          currentblock.classList.remove("br-grey");
          currentblock = currentblock.nextElementSibling;
        }
      }
    }
  }
}

function selectCoordinates(length, orientation, blockvalue) {
  console.log(this.getAttribute("disabled"));

  if (shipnames.length > 0) {
    let flag = true;
    for (const ship of Object.values(ships)) {
      if (blockvalue == ship.coordinates[0]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      let currentblock = this;

      if (orientation == "H") {
        for (let i = 0; i < length; i = i + 1) {
          ships[selectedship].coordinates.push(
            currentblock.getAttribute("value")
          );

          currentblock.setAttribute("disabled", "true");

          currentblock = currentblock.nextElementSibling;
        }
      }

      shipnames.splice(shipnames.indexOf(selectedship), 1);
      console.log(shipnames);
      if (count > shipnames.length - 1) {
        console.log("here");
        count = shipnames.length - 1;
      }

      selectShip();
    }
  }
}

const selectShip = () => {
  console.log(count);
  selectedship = shipnames[count];
  ship.innerText = selectedship;
};
