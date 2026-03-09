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
        let [first, last] = (fullName || '').split(' ');
        if (first && last) {
            this.name = first;
            this.surname = last;
        }
    }

    static match(teacher, student, course) {
        let matched = [];
        for (let scourse of student.courses) {
            for (let tcourse of teacher.courses) {
                if (scourse.course === tcourse.course && scourse.level <= tcourse.level) {
                    matched.push(scourse);
                }
            }
        }

        if (course) {
            for (let mcourse of matched) {
                if (mcourse.course === course) return mcourse;
            }
            return undefined;
        } else {
            return matched;
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

let student = new Student({name: 'Astri', surname: 'Pascual', email: 'astri@example.com'});
let teacher = new Teacher({name: 'Am', surname: 'Zolina', email: 'amzolina@example.com'});

student.addCourse('Math', 2);
student.addCourse('Physics', 1);
teacher.addCourse('Math', 3);
teacher.addCourse('Biology', 2);

console.log('All matches:', ExtendedUser.match(teacher, student));

console.log('Specific course match (Math):', ExtendedUser.match(teacher, student, 'Math'));
console.log('Specific course match (Physics):', ExtendedUser.match(teacher, student, 'Physics'));