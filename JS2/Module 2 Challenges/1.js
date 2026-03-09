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

let student = new User({name: 'Astri', surname: 'Pascual', email: 'astri@example.com', role: 'student'});
let teacher = new User({name: 'Am', surname: 'Zolina', email: 'amzolina@example.com', role: 'teacher'});

student.addCourse('Math', 2);
student.addCourse('Physics', 1);
teacher.addCourse('Math', 3);

student.editCourse('Physics', 2);
student.removeCourse('Math');

student.sendMessage(teacher, 'Hi, I need help with Physics.');
teacher.sendMessage(student, 'Sure, I can help you with that.');

student.showMessagesHistory();
teacher.showMessagesHistory();