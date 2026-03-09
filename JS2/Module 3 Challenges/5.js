class Point {
    constructor(x, y) {
        this.type = 'point';
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(points) {
        this.type = 'line';
        this.points = points.map(p => new Point(p[0], p[1]));
    }
}

class Figure {
    constructor() {
        this.elements = { points: [], lines: [] };
    }

    addPoint(x, y) {
        this.elements.points.push(new Point(x, y));
    }

    addLine(points) {
        this.elements.lines.push(new Line(points));
    }

    static isSamePoint(p1, p2) {
        return p1 && p2 && p1.x === p2.x && p1.y === p2.y;
    }

    static isSameLine(l1, l2) {
        if (!l1 || !l2 || l1.points.length !== l2.points.length) return false;
        return l1.points.every((p, i) => Figure.isSamePoint(p, l2.points[i]));
    }

    sortPoints() {
        this.elements.points.sort((a, b) => a.x - b.x || a.y - b.y);
    }

    sortLines() {
        this.elements.lines.sort((l1, l2) => {
            for (let i = 0; i < l1.points.length; i++) {
                let diff = l1.points[i].x - l2.points[i].x || l1.points[i].y - l2.points[i].y;
                if (diff !== 0) return diff;
            }
            return 0;
        });
    }

    cleanUp() {
        this.sortPoints();
        this.elements.points = this.elements.points.reduce((acc, cur) => {
            if (!acc.length || !Figure.isSamePoint(acc[acc.length - 1], cur)) acc.push(cur);
            return acc;
        }, []);

        this.sortLines();
        this.elements.lines = this.elements.lines.reduce((acc, cur) => {
            if (!acc.length || !Figure.isSameLine(acc[acc.length - 1], cur)) acc.push(cur);
            return acc;
        }, []);
    }
}

// Test
let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 20); // duplicate
f.addPoint(5, 10);
f.addLine([[0,0],[1,1]]);
f.addLine([[0,0],[1,1]]); // duplicate
f.addLine([[2,2],[3,3]]);

console.log("Before cleanup:");
console.log(f.elements.points.length); // 3
console.log(f.elements.lines.length);  // 3

f.cleanUp();

console.log("After cleanup:");
console.log(f.elements.points.length); // 2
console.log(f.elements.lines.length);  // 2