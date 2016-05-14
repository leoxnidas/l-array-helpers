var _ = require('../index');
require('l-string')

console.log("------------ each function -----------");
_.each([1,2,3,4], function(el, i){
    console.log(el, i);
});

_.each("asd", function(el, i, total_length){
    console.log(el, i, total_length);
});

console.log("--------------- contains -------------");
console.log(_.contains([1,2,3,4], 3));
console.log(_.contains("leonardo", 'e'));


console.log("--------------- without ---------------")
console.log(_.without([1,2,3,4,5,6,7,8,9,10,11,12,13], 1,2));
console.log(_.without("leonardo", 'o', 'e'));

console.log("--------------- range -----------------")
console.log(_.range(5));
console.log(_.range(2, 20, 4));
console.log(_.range(1, 10, 2));

console.log("--------------- first ------------------")
console.log(_.first([1,2,3,4,5]));
console.log(_.first([1,2,3,4,5,6], 2));
console.log(_.first("leonardo esparis", 2));

console.log("--------------- last -------------------")
console.log(_.last([1,2,3,4,5,6]));
console.log(_.last([1,2,3,4,5,6,7,8,9], 4));
console.log(_.last("leonardo esparis", 2))

console.log("--------------- reverse ----------------")
console.log(_.reverse([1,2,3,4,5,6]));
console.log(_.reverse("leonardo"));

console.log("--------------- map ---------------------")
console.log(_.map([[1,2,3,4], [5,6,7,8]], _.reverse));
console.log(_.map([1,2,3,4], function(el){
    return el * 2;
}));
console.log(_.map("leonardo", function(el){
	return el + el;
}));

console.log("--------------- filter -------------------")
console.log(_.filter([1,2,3,4,5], function(el){
    return el % 2 === 0;
}));
console.log(_.filter("leonardo", function(el){
	return el === 'e';
}));

console.log(_.filter([1,2,3,4,5,6,7,8,9,4, 100, 12], function(el){
	return el >= 5 && el <= 10;
}));

console.log("--------------- zip ----------------------")
console.log(_.zip([1,2,3],[4,5,6],[7,8,9]));
console.log(_.zip([1,2], [3,4]));
console.log(_.zip([1,2], [3,4], [5,6]));
console.log(_.zip([1,2,3], [4,5,6]));
console.log(_.zip("leo", "car"));

console.log("----------------- min -----------------")
console.log(_.min([-100, -2, 1,2,3,4]));
console.log(_.min("leonardo"))

console.log("----------------- max -----------------")
console.log(_.max("leonardo"))
console.log(_.max([1,2,3,4,5,6,7]))

console.log("----------------- r_each --------------")
_.r_each([1,2,3,4,5,6,7,8], function(el){
	console.log(el);
});

_.r_each("leonardo esparis", function(el){
	console.log(el);
});

console.log("----------------- sort -----------------")
console.log(_.sort([2,1,3,5,10,89]));
console.log(_.sort([2,1,3,5,100,-1], function(el1, el2){
	return el1 < el2;
}));
console.log(_.sort("leonardo"));

console.log("----------------- extend ----------------")
var array = [1,2,3,4]
_.extend(array, [5,6,7,8], "leonardo esparis", 100, 200);
console.log(array);


console.log("----------------- chain, chain_from_iterable -----------")
console.log(_.chain([1,2,3,4,5], [100, 200 ,300]));
console.log(_.chain_from_iterable([[1,2,3,4,5], [10, 20, 30]]));
console.log(_.chain("leonardo", "esparis"))
console.log(_.chain_from_iterable(["leonardo", "esparis"]))

console.log("----------------- repeat ----------------------")
_.repeat(2, function(el){
	console.log(el);
});

console.log("----------------- copy_array --------------------")
var a = [1,2,3,4];
var b = _.copy_array(a);
console.log(b, a);
a.pop()
console.log(b, a);


var c = _.copy_array("leonardo");
console.log(c);


console.log("-------------- pop, popLeft ------------------");
var D = [1,2,3,4,5];

_.pop(D, function(el){
	console.log("element poped out ", el);
});

_.popLeft(D, function(el){
	console.log("element poped out ", el);
});

console.log(D)
