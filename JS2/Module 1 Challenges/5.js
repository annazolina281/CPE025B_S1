let deepComp = function(src, trg) {
    let keysSrc = Object.keys(src);
    let keysTrg = Object.keys(trg);

    if (keysSrc.length !== keysTrg.length) return false;

    for (let key of keysSrc) {
        if (!trg.hasOwnProperty(key)) return false;

        if (typeof src[key] === 'object' && src[key] !== null) {
            if (!deepComp(src[key], trg[key])) return false;
        } else if (src[key] !== trg[key]) {
            return false;
        }
    }

    return true;
}

// Test
let obj1 = { title: 'Mona Lisa', details: { artist: 'Leonardo da Vinci', date: 1503 } };
let obj2 = { title: 'Mona Lisa', details: { artist: 'Leonardo da Vinci', date: 1503 } };
let obj3 = { title: 'Mona Lisa', details: { artist: 'Leonardo da Vinci', date: 1504 } };

console.log(deepComp(obj1, obj2)); // true
console.log(deepComp(obj1, obj3)); // false