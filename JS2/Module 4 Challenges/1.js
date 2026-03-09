class MyIterable {
    constructor() {
        this.data = [];
    }

    get length() {
        return this.data.length;
    }

    has(n) {
        return this.data.includes(n);
    }

    add(n) {
        if (!this.has(n)) this.data.push(n);
    }

    del(n) {
        let index = this.data.indexOf(n);
        if (index !== -1) this.data.splice(index, 1);
    }

    *[Symbol.iterator]() {
        for (let item of this.data) yield item;
    }
}

// Test
let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2); // duplicate, ignored
iterable.del(3);

console.log(iterable.length); // 2
console.log(iterable.has(2)); // true
console.log(iterable.has(3)); // false
console.log(...iterable);      // 2 5