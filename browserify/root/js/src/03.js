var numbers = require('./01');
var calcModule = require('./02');

var test = calcModule.add(numbers.first, numbers.second);

calcModule.show(test);

