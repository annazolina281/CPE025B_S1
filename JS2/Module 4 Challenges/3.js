function getPromiseArray(arr) {
    return arr.map(item => new Promise((resolve, reject) => {
        if (Number.isInteger(item) && item > 0) {
            setTimeout(() => resolve(item), item); // resolve after "item" milliseconds
        } else {
            reject(new Error(`${item} is not a positive integer`));
        }
    }));
}

// Test
let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);

Promise.all(promises1)
    .then(a => console.log(`all: ${a}`))
    .catch(e => console.log(`all: ${e.message}`));

Promise.any(promises1)
    .then(a => console.log(`any: ${a}`))
    .catch(e => console.log(`any: ${e.message}`));