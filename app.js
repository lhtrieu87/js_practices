// String is a function, so it inherits 'method' from Function.prototype.
String.method("trim", function() {
	console.log(this);
	return this.replace(/^\s+|\s+$/g, '');
});

String.method("deentityify", function() {
	// This function is a closure to hide entity var.
	// Static attribute.
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};
	
	return function() {
		return this.replace(/&([^&;]+);/g, function(a, b) {
			console.log(a + "   " + b);
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		});
	};
}()); // Execute the function immediately so entity table is only constructed once (static attribute).

var serialMaker = function() {
	// This function serves as a closure to hide internal attributes.
	var prefix = '';
	var seq = 0;
	
	return {
		setPrefix: function(p) {
			prefix = String(p);
		},
		setSeq: function(s) {
			seq = s;
		},
		gen: function() {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
}; // Every returned object has its own prefix and seq.

var fibonacci = memoizer([0, 1], 'number', function(shell, n) {
	return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1, 1], 'number', function(shell, n) {
	return n * shell(n - 1);
});