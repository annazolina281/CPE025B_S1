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

    toJSON() {
        return JSON.stringify(this.elements);
    }

    fromJSON(data, add = false) {
        let obj = JSON.parse(data);
        if (add) {
            this.elements.points = this.elements.points.concat(obj.points || []);
            this.elements.lines = this.elements.lines.concat(obj.lines || []);
        } else {
            this.elements = obj;
        }
    }

    deleteAll() {
        this.elements.points = [];
        this.elements.lines = [];
    }
}

// Test
let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 10);
f.addLine([[10, 20], [30, 40], [50, 60]]);

let json = f.toJSON();
console.log(json);

f.fromJSON(json, true);
console.log(f.elements.points.length); // 4
console.log(f.elements.lines.length);  // 2