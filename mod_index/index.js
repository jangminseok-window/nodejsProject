
function sum(max){
    this.name = 'Hello Max Sum!';
    this.message;
    this.max = max;
    
}



// message 변수에 값을 입력하는 함수
sum.prototype.calc = function(){
    return (this.max+1)*this.max/2;
}


// message 변수에 값을 입력하는 함수
sum.prototype.setMessage = function(msg){
    this.message = msg;
}
// message 변수의 값을 가져오는 함수
sum.prototype.getMessage = function(){
    return this.message;
}

module.exports = sum;