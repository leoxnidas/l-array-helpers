#!/usr/local/bin/env node

"use strict";

require('l-string');
var util = require("util");


/**
 * Will transform a string into an array,
 * if ${obj} is an array, nothing happens.
 *
 * @param {Array|String} An string or array object.
 * @return {Array} an array object
 **/
var arraytify = function(obj) {
	if(util.isString(obj)){
		return obj.toCharArray();
	}
	return obj;
}


// take it from underscorejs
//
// Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
// This accumulates the arguments passed into an array, after a given index.
var restArgs = function(func, startIndex) {
	startIndex = startIndex == null ? func.length - 1 : +startIndex;
	return function() {
		var length = Math.max(arguments.length - startIndex, 0);
		var rest = Array(length);
		for (var index = 0; index < length; index++) {
			rest[index] = arguments[index + startIndex];
		}
		switch (startIndex) {
		case 0: return func.call(this, rest);
		case 1: return func.call(this, arguments[0], rest);
		case 2: return func.call(this, arguments[0], arguments[1], rest);
		}
		var args = Array(startIndex + 1);
		for (index = 0; index < startIndex; index++) {
			args[index] = arguments[index];
		}
		args[startIndex] = rest;
		return func.apply(this, args);
	};
};


/**
 * Will iterate the ${obj}, from left to right.
 *
 * @param {Array|String} String or Array object, that the user want to iterate 
 * @param {Function} Callback that will be called every iteration.
 **/
var each = function(obj, cb){
	(arraytify(obj)).forEach(function(el, i, arr){
		cb.call(cb, el, i, arr.length);
	});
}
exports.each = each;


/**
 * Will iterate the ${obj},
 * from right to left.
 *
 * @param {Array|String} object that will be iterated.
 * @param {Function} Callback that will be called every iteration.
 **/
var r_each = function(obj, cb){
	for(var i = obj.length - 1; i >= 0; i--){
		cb.call(cb, obj[i], i, obj.length);
	}
}
exports.r_each = r_each;


/**
 * Will test, if the array or string ${obj},
 * contains the ${element}.
 *
 * @param {Array|String}
 * @param {Object}
 * @return {Boolean}
 **/
var contains = function(obj, element){
	var contains = false;
	each(obj, function(el){
		if(el === element) {
			contains = true;
		}
	});
	return contains;
}
exports.contains = contains;


/**
 * Will return an array of all elements, that do not
 * belong to ${array}.
 *
 * @param {Array|String}
 * @param {Array}
 * @return {Array}
 **/
var without = restArgs(function(obj, array){
	var result = [];
	each(obj, function(el){
		if(!contains(array, el)){
			extend(result, el);
		}
	});
	return util.isString(obj)?result.join(''): result;
})
exports.without = without;


/**
 * Will generate an array of numbers, from
 * ${start} to ${stop}.
 *
 * @param {Int}
 * @param {Int}
 * @param {Int}
 * @return {Array}
 **/
var range = function(start, stop, step){
	if(util.isNullOrUndefined(stop)){
		stop = start;
		start = 0;
	}

	if(util.isNullOrUndefined(step)) {
		step = 1;
	}

	var arr = [];
	for(var i = start; i < stop; i += step){
		extend(arr, i);
	}
	return arr;
}
exports.range = range;


/**
 * Return an iterator that applies function to every item of iterable
 *
 * @param {Array|String}
 * @param {Function}
 * @return {Array}
 **/
var map = function(obj, cb){
	var res = [];
	each(obj, function(el, i){
		res.push(cb.call(cb, el, i));
	});
	return util.isString(obj)? res.join(''): res;
}
exports.map = map;


/**
 * Return the array ${obj}, reversed;
 *
 * @param {Array|String}
 * @return {Array}
 **/
var reverse = function(obj){
	var arr = [];
	
	r_each(arraytify(obj), function(el){
		extend(arr, el);
	});
	return util.isString(obj)? arr.join(''): arr;
}
exports.reverse = reverse;


/**
 * Return the first element of the array ${obj}, 
 * if it is ${n} defined, it will return the array's first n-elements.
 *
 * @param {Array|String}
 * @param {Int}
 * @return {Array}
 **/
var first = function(obj, n){
	if(util.isNullOrUndefined(n)){
		n = 1;
	}

	var i = 0
	,   arr = [];
	repeat(obj.length, function(j){
		extend(arr, obj[j - 1]);
		i++;
		if(i == n) {
			return false;
		}
		return true;
	});
	return arr;
}
exports.first = first;


/**
 * Return the last element of the array ${obj},
 * if it is ${n} defined, it will return the array's last
 * n-elements
 *
 * @param {Array|String}
 * @param {Int}
 * @return {Array}
 **/
var last = function(obj, n) {
	if(util.isNullOrUndefined(n)){
		n = 1;
	}

	var arr = []
	,   j = 0
	,   i = obj.length - 1;
	repeat(obj.length, function(){
		extend(arr, obj[i]);
		j++;
		i--;
		if(j === n){
			return false;
		}
		return true;
	});
	return arr;
}
exports.last = last;


/**
 * Construct an iterator from those elements of iterable for which function returns true.
 *
 * @param {Array|String}
 * @param {Callback}
 * @return {Array}
 **/
var filter = function(obj, cb){
	var arr = [];
	each(obj, function(el){
		if(cb.call(cb, el)){
			extend(arr, el);
		}
	});
	return arr;
}
exports.filter = filter;


/**
 * Make an iterator that aggregates elements from each of the iterables
 *
 * @param {Array|String}
 * @return {Array}
 **/
var zip = restArgs(function(obj){
	var arr = [];
	repeat(obj[0].length, function(i){
		arr.push(map(obj, function(el){
			return el[i - 1];
		})); 
	});
	return arr;
})
exports.zip = zip;


/**
 * Return the min array's element.
 *
 * @param {Array|String}
 * @return {Array}
 **/
var min = function(obj){
	var re = null;
	each(obj, function(el){
		if(util.isNullOrUndefined(re)){
			re = el;
		}

		if(el < re){
			re = el;
		}
	});
	return re;
}
exports.min = min;


/**
 * Will return the max array's element.
 *
 * @param {Array|String}
 * @return {Array}
 **/
var max = function(obj){
	var re = null;
	each(obj, function(el){
		if(util.isNullOrUndefined(re)){
			re = el;
		}else if(el > re){
			re = el;
		}
	});
	return re;
}
exports.max = max;


/**
 * it will be sorted, using the basic, bubble sort method.
 *
 * @param {Array|String}
 * @param {Function}
 * @return {Array}
 **/
var sort = function(obj, how) {
	if(util.isNullOrUndefined(how)){
		how = function(el1, el2){return el1 > el2;};
	}

	var arr = copy_array(obj);
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr.length - 1; j++){
			if(how(arr[j], arr[j + 1])){
				var aux = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = aux;
			}
		}
	}
	return util.isString(obj)? arr.join(''): arr;
}
exports.sort = sort;


/**
 * Return an ${obj}'s copy.
 *
 * @param {Array|String}
 * @param {Array}
 **/
var copy_array = function(obj){
	var arr= [];
	each(obj, function(el){
		extend(arr, el);
	});
	return arr;
}
exports.copy_array = copy_array;


/**
 * Return arrays concatenated.
 *
 * @param {Object}
 * @return {Array}
 **/
var chain = restArgs(function(array){
	var arr = [];
	each(array, function(el){
		extend(arr, el);
	});
	return arr;
})
exports.chain = chain;


/**
 * Return arrays concatenated inside an iterable.
 *
 * @param {Array|String}
 * @return {Array}
 **/
var chain_from_iterable = function(iterable){
	var arr = [];
	each(iterable, function(el){
		extend(arr, el);
	});
	return arr;
}
exports.chain_from_iterable = chain_from_iterable;


/**
 * Extend ${obj}'s array, with n-elements.
 *
 * @param {Array}
 * @param {Object}s
 **/
var extend = restArgs(function(obj, arr){
	each(arr, function(el){
		el = arraytify(el);
		if(util.isArray(el)){
			each(el, function(element){
				obj.push(element);
			});
		}else {
			obj.push(el);
		}
	});
})
exports.extend = extend;


/**
 * Create a loop an finite or infinite loop.
 *
 * @param {Int}
 * @param {Function}
 **/
var repeat = function(times, cb){
	if(util.isNullOrUndefined(cb)){
		cb = function(obj){};
	}

	if(util.isFunction(times)){
		cb = times;
		times = -1;
	}

	var exit = true
	,   user_value = null
	,   i = 0;
	while(exit){
		i++;
		times--;
		user_value = cb.call(cb, i);
		if(times == 0){
			exit = false;
		}
		if(user_value == false){
			exit = user_value;
		}
	}
}
exports.repeat = repeat;


/**
 * Pop the last element of the ${obj}.
 *
 * @param {Array|String}
 * @param {Function}
 **/
var pop = function(obj, cb){
	if(util.isNullOrUndefined(cb)){
		cb = function(el){return;};
	}
	obj = arraytify(obj);
	cb.call(cb, obj.pop());
}
exports.pop = pop;


/**
 * Pop the first element of the ${obj}.
 *
 * @param {Array|String}
 * @param {Function}
 **/
var popLeft = function(obj, cb){
	if(util.isNullOrUndefined(cb)){
		cb = function(el){return;};
	}
	cb.call(cb, obj.shift());
}
exports.popLeft = popLeft;

