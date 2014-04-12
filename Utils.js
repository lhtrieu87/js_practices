// Prototypal inheritance.
// Cons: All properties are public.
if (typeof Object.beget !== 'function') {
	Object.beget = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) this.prototype[name] = func;
}

// Curry a function and return a new function.
Function.method('curry', function() {
	var slice = Array.prototype.slice;
	var args = slice.apply(arguments);
	var that = this;

	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

var add = function(a, b) {
		if (typeof a !== 'number' || typeof b !== 'number') {
			throw {
				name: 'TypeError',
				message: 'add needs numbers'
			}
		}

		return a + b;
	};

// Useful for dynamic programming.
var memoizer = function(memo, validValue, fundamental) {
		var shell = function(n) {
				var result = memo[n];

				if (typeof result !== validValue) {
					console.log('Compute new value!');
					result = fundamental(shell, n);
					memo[n] = result;
				}

				return result;
			}

		return shell;
	};

// Functional inheritance uses factory function,
// which is a closure hiding private attributes and functions of 
// the factoried object.
Object.method('superior', function(name) {
	var that = this;
	var method = that[name];

	return function() {
		return method.apply(that, arguments);
	};
});
