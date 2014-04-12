var mammal = function(spec) {
		var that = {};

		that.getName = function() {
			// Do not use this or that.name.
			// Make the returned object durable so 
			// it cannot be tempered externally.
			return spec.name;
		};

		that.says = function() {
			return spec.saying || '';
		}

		return that;
	};

var cat = function(spec) {
		spec.saying = spec.saying || 'meow';

		// 'this' refers to global scope.
		var that = mammal(spec);

		that.purr = function(n) {
			var i, s = '';
			for (i = 0; i < n; i += 1) {
				if (s) {
					s += '-';
				}
				s += 'r';
			}
			return s;
		};

		that.getName = function() {
			return that.says() + " " + spec.name + " " + that.says();
		};

		return that;
	};

var coolCat = function(spec) {
	var that = cat(spec);
	
	var superGetName = that.superior("getName");
	
	that.getName = function() {
		return 'like ' + superGetName() + ' baby';
	};
	
	return that;
};