var module = require('./mod_index');


var modulecls = new module(102);


// 1. formatted 특수문자 %d를 사용해서 module.sum( ) 에서 리턴된 숫자값을 출력
console.log('sum = %d' , modulecls.calc());

// 2. formatted 특수문자 %s를 사용해서 module.var1의 문자값을 출력
modulecls.setMessage("welcome....");
var mess = modulecls.getMessage();

console.log(`messs ="${mess}"`  );