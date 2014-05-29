var Interface = function (name, methods) {
  if(arguments.length != 2)
    throw new Error('The number of arguments for Interface constructor must be 2!');

  this.name = name;

  this.methods = [];
  var methodCount = methods.length;
  // Perform deep copy.
  for(var i = 0; i < methodCount; i++) {
    if(typeof methods[i] !== 'string')
      throw new Error('Interface constructor expects method names passed in as string!');

    this.methods[i] = methods[i];
  }
};

// Static method.
Interface.ensureImplements = function (object) {
  if(arguments.length < 2)
    throw new Error('Interface.ensureImplements must take in >= 2 arguments!');

  for(var i = 1, count = arguments.length; i < count; i++) {
    var interface = arguments[i];

    if(!(interface instanceof Interface))
      throw new Error('Interface.ensureImplements expects interfaces passed in type of Interface');

    for(var j = 0, methodCount = interface.methods.length; j < methodCount; j++) {
      var method = interface.methods[j];
      if(!object[method] || typeof object[method] !== 'function')
        throw new Error('Method ' + method + ' in the interface ' + interface.name + ' is not implemented by ' + object);
    }
  };
};

