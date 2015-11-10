(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var numbers = {
	first: 1,
	second: 2
};

module.exports = numbers;
},{}],2:[function(require,module,exports){
function add(a, b) {
	return a + b;
}

function showLog(arg) {
	console.log(arg);
}

module.exports = {
	add: add,
	show: showLog
};


},{}],3:[function(require,module,exports){
var numbers = require('./01');
var calcModule = require('./02');

var test = calcModule.add(numbers.first, numbers.second);

calcModule.show(test);


},{"./01":1,"./02":2}]},{},[1,2,3]);
