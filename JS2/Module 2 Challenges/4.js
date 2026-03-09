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

class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    getStudentByName(name, surname) {
        return this.students.find(s => s.name === name && s.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(t => t.name === name && t.surname === surname);
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student => ExtendedUser.match(teacher, student).length > 0);
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => ExtendedUser.match(teacher, student).length > 0);
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({name, surname, email}));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({name, surname, email}));
    }
}

let tutoring = new Tutoring();

tutoring.addStudent('Astri', 'Pascual','astri@example.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@example.com');
tutoring.addTeacher('Am', 'Zolina', 'amzolina@example.com');
tutoring.addTeacher('Paula', 'Thompkins', 'paula@example.com');

let student1 = tutoring.getStudentByName('Astri', 'Pascual');
student1.addCourse('Math', 2);
student1.addCourse('Physics', 4);

let teacher1 = tutoring.getTeacherByName('Am', 'Zolina');
teacher1.addCourse('Math', 4);

let studentsForTeacher = tutoring.getStudentsForTeacher(teacher1);
let teachersForStudent = tutoring.getTeacherForStudent(student1);

console.log('Teachers for Astri:', teachersForStudent[0]);
console.log('Students for Am Zolina:', studentsForTeacher[0]);

let student2 = tutoring.getStudentByName('Kelly', 'Estes');
let teachersForStudent2 = tutoring.getTeacherForStudent(student2);
let studentsForTeacher2 = tutoring.getStudentsForTeacher(teacher1);

console.log('Teachers for Kelly:', teachersForStudent2[0]); 
console.log('Students for Am Zolina:', studentsForTeacher2[0]); 