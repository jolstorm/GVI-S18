// for (let i = 0; i <= 4; i += 1) {
//   setTimeout(function () {
//     console.log(i);
//   }, 0);
// }

// let o = {
//   x: 5,
//   y: function (y) {
//     console.log(this);
//     return this.x + y;
//   },
// };

// const c = {
//   x: 10,
// };
// console.log(o.y.call(c, 10));

// let arr = [2, 3, 4, 5, 6];
// arr.length = 0;
// console.log();

function a(x) {
  return function (y) {
    return x + y;
  };
}
console.log("yolo");
console.log(a(5)(10));
