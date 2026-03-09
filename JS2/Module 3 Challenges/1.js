function getRandomSet(m, n, uniq, sorted) {

    let numbers = uniq ? new Set() : [];

    while ((uniq ? numbers.size : numbers.length) < m) {
        let randomNum = Math.floor(Math.random() * n);

        if (uniq) {
            numbers.add(randomNum);
        } else {
            numbers.push(randomNum);
        }
    }

    let result = [...numbers];

    if (sorted) {
        result.sort((a, b) => a - b);
    }

    return result;
}

console.log(getRandomSet(10, 20, false, false));
console.log(getRandomSet(10, 20, false, true));
console.log(getRandomSet(10, 20, true, false));
console.log(getRandomSet(10, 20, true, true));