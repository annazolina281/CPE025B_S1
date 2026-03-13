const memo = {};
function power(base, exp) {
    
    if (exp === 0) {
        return 1;
    }
    if (exp < 0) {
        return 1 / power(base, -exp);
    }
    const result = 
        base * power(base, exp - 1);
    return result; 

}
// Test Code
console.log(power(2, 5));
console.log(power(2, -2));

