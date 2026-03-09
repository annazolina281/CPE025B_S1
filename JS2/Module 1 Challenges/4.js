let Image = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

let images = {
    list: [],
    contains: function(title) {
        for (let image of this.list) {
            if (image.title === title) return true;
        }
        return false;
    },
    add: function(title, artist, date) {
        if (!this.contains(title)) {
            this.list.push(new Image(title, artist, date));
        }
    },
    show: function() {
        for (let image of this.list) {
            image.show();
        }
    },
    clear: function() {
        this.list = [];
    }
};

Image.prototype.show = function() {
    console.log(`${this.title} (${this.artist}, ${this.date})`);
}

images.edit = function(title, artist, date) {
    for (let image of this.list) {
        if (image.title === title) {
            image.artist = artist;
            image.date = date;
            break;
        }
    }
}

images.delete = function(title) {
    for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].title === title) {
            this.list.splice(i, 1);
            break;
        }
    }
}

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.show();

images.edit('Mona Lisa', 'L. da Vinci', 1504);
images.show();

images.delete('The Last Supper');
images.show();