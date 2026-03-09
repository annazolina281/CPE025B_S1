// Decorator to remember function arguments
function myDecorator(fn) {
    let cache = [];

    return function(...args) {
        let found = cache.some(c => c.length === args.length && c.every((v, i) => v === args[i]));
        if (found) {
            console.log(`arguments already used: ${args}`);
        } else {
            cache.push(args);
            return fn(...args);
        }
    };
}

// Test function
let sum = function(...args) {
    return args.reduce((total, n) => total + n, 0);
};

// Decorate the function
let dfn = myDecorator(sum);

// Test calls
dfn(2, 3, 4);   // first time
dfn(4, 5);      // first time
dfn(2, 3, 4);   // repeated
dfn(4, 5);      // repeated