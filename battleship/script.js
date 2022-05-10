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
  for (const details of Object.values(ships)) {
    if (details.coordinates.length == 0) {
      details.orientation = shiporientation;
      // ships[ship.].orientation = shiporientation;
    }
  }

  // ships[selectedship].orientation = shiporientation;
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
    console.log(selectedship + " " + length);
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
            if (currentblock.classList.contains("br-grey")) {
              // console.log(currentblock);
              flag = false;

              break;
            } else {
              currentblock = currentblock.nextElementSibling;
            }
          }
          // console.log(`Flag=${flag}`);
          if (flag) {
            currentblock = this;
            // console.log("Length inside highlightBlocks" + length);
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(this, orientation, blockvalue);
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
          let flag = true;
          for (let i = row; i < length + row; i = i + 1) {
            currentblock = document.querySelector(
              `[value="${String.fromCharCode(64 + i)}${column}"]`
            );
            if (currentblock.classList.contains("br-grey")) {
              // console.log(currentblock);
              flag = false;

              break;
            }
          }

          if (flag) {
            currentblock = this;
            currentblock.addEventListener("click", () => {
              selectCoordinates.call(
                this,
                orientation,
                blockvalue,
                row,
                column
              );
            });
            for (let i = row; i < length + row; i = i + 1) {
              currentblock = document.querySelector(
                `[value="${String.fromCharCode(64 + i)}${column}"]`
              );
              currentblock.classList += " br-grey";
              // console.log(currentblock.getAttribute("value"));
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

    if (!currentblock.getAttribute("disabled")) {
      if (ships[selectedship].orientation == "H") {
        // if (10 - column >= length - 1) {
        //   let flag = true;
        //   for (let i = column; i < length + column; i = i + 1) {
        //     if (currentblock.classList.contains("br-grey")) {
        //       // console.log(currentblock);
        //       flag = false;

        //       break;
        //     } else {
        //       currentblock = currentblock.nextElementSibling;
        //     }
        //   }
        //   if (flag) {
        //     currentblock = this;
        for (let i = 0; i < length; i = i + 1) {
          if (currentblock.classList.contains("br-grey")) {
            // console.log(currentblock);
            currentblock.classList.remove("br-grey");
            currentblock = currentblock.nextElementSibling;
            // console.log(currentblock);
          }
        }
      } else {
        //Vertical
        // console.log(row);
        if (10 - row >= length - 1) {
          for (let i = row; i < length + row; i = i + 1) {
            currentblock = document.querySelector(
              `[value="${String.fromCharCode(64 + i)}${column}"]`
            );
            console.log(
              "currentblock" +
                currentblock.getAttribute("value") +
                "currentblock disabled:" +
                currentblock.getAttribute("disabled") +
                typeof currentblock.getAttribute("disabled") +
                !currentblock.getAttribute("disabled")
            );
            if (
              currentblock.classList.contains("br-grey") &&
              !currentblock.getAttribute("disabled")
            ) {
              console.log("last check");
              currentblock.classList.remove("br-grey");
              // console.log("Removing:" + currentblock.getAttribute("value"));
            }
          }
        }
      }
    }
  }
}
function selectCoordinates(orientation, blockvalue, row, column) {
  const length = ships[selectedship].size;
  console.log("Length inside sc:" + length);
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

      if (orientation == "H") {
        for (let i = 0; i < length; i = i + 1) {
          ships[selectedship].coordinates.push(
            currentblock.getAttribute("value")
          );
          console.log(
            "pushing:" +
              currentblock.getAttribute("value") +
              "to" +
              selectedship
          );
          currentblock.setAttribute("disabled", "true");

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
          console.log(
            "pushing:" +
              currentblock.getAttribute("value") +
              "to" +
              selectedship
          );
          currentblock.setAttribute("disabled", "true");
        }
      }

      shipnames.splice(shipnames.indexOf(selectedship), 1);
      console.log("Shipnames:" + shipnames);
      console.log(shipnames.length);
      if (count > shipnames.length - 1) {
        count = shipnames.length - 1;
      }

      selectShip();
    }
  }
}

const selectShip = () => {
  // console.log("count:" + count);
  selectedship = shipnames[count];
  if (count == -1) {
    ship.innerText = "all selected";
  } else {
    ship.innerText = selectedship;
  }
  ship.innerText = count == -1 ? "all selected" : selectedship;
  // console.log(
  //   "Currrent ship:" +
  //     ships[selectedship].size +
  //     ships[selectedship].orientation
  // );
};
