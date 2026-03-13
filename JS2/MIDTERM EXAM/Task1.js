
function sumDeepStrictNumbers(arr) {
    let sum = 0;
    for (let element of arr) {
        if (typeof element === 'number' && !isNaN(element)) {
            sum += element;
        } else if (Array.isArray(element)) {
            sum += sumDeepStrictNumbers(element);
        }
    }
    return sum;
}

// Test Code
const testArray1 = [10, ['5', [true, 5]], null, [undefined, [10, NaN]]];
console.log(sumDeepStrictNumbers(testArray1));

