function firstUniqueChar(str) {
    for(var j = 0; j < str.length; j++) {
        var c = str.charAt(j).toLowerCase();
        var count = 0;
        for(var s = 0; s < str.length; s++) {
            if(str.charAt(s).toLowerCase() === c) {
                count++;
            }
        }
        if(count === 1) {
            return str.charAt(j);
        }
    }
    return null;
}

// Test Code
console.log(firstUniqueChar('sTreSS'));
console.log(firstUniqueChar('aabbc')); 

