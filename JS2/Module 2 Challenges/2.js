function sendEmail(from, to, message) {}

class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.messages = [];
        this.courses = [];
    }

    addCourse(course, level) {
        for (let c of this.courses) {
            if (c.course === course) return;
        }
        this.courses.push({course, level});
    }

    removeCourse(course) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].course === course) {
                this.courses.splice(i, 1);
                break;
            }
        }
    }

    editCourse(course, level) {
        for (let c of this.courses) {
            if (c.course === course) {
                c.level = level;
                break;
            }
        }
    }

    sendMessage(from, message) {
        this.messages.push({from: from.email, to: this.email, content: message});
        sendEmail(from.email, this.email, message);
    }

    showMessagesHistory() {
        for (let message of this.messages) {
            console.log(`${message.from} -> ${message.to}: ${message.content}`);
        }
    }
}
class ExtendedUser extends User {
    constructor({name, surname, email, role}) {
        super({name, surname, email, role});
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(fullName) {
        let [first, last] = fullName.split(' ');
        if (first && last) {
            this.name = first;
            this.surname = last;
        }
    }
}

class Teacher extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'teacher'});
    }
}

class Student extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'student'});
    }
}


let student1 = new Student({name: 'Astri', surname: 'Pascual', email: 'astri@example.com'});
let teacher1 = new Teacher({name: 'Am', surname: 'Zolina', email: 'amzolina@example.com'});

student1.addCourse('Math', 2);
teacher1.addCourse('Physics', 3);
teacher1.addCourse('Chemistry', 4);

console.log(`${student1.fullName}: ${student1.courses.length} courses`);
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`);

student1.fullName = 'Astri Johnson';
console.log(`${student1.fullName}: ${student1.courses.length} courses`);