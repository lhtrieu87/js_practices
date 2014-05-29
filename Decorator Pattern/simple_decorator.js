var Laptop = function () {
  this.cost = function () {
    return 1000;
  };
};

function Memory(laptop) {
  if(!(laptop instanceof Laptop))
    throw new Error('Memory expects the argument to be a Laptop!');

  var cost = laptop.cost();
  laptop.cost = function () {
    return cost + 300;
  };
}

