let nameRegExp = /^[A-Z][a-z]+$/;
let emailRegExp = /^([a-zA-Z]+\.)*[a-zA-Z]+@([a-zA-Z]+\.)+[a-zA-Z]{2,3}$/;

class User {
    #name;
    #surname;
    #email;

    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    get name() { return this.#name; }
    set name(val) {
        if (val.match(nameRegExp)) this.#name = val;
        else throw new Error(`Incorrect name format: ${val}`);
    }

    get surname() { return this.#surname; }
    set surname(val) {
        if (val.match(nameRegExp)) this.#surname = val;
        else throw new Error(`Incorrect surname format: ${val}`);
    }

    get email() { return this.#email; }
    set email(val) {
        if (val.match(emailRegExp)) this.#email = val;
        else throw new Error(`Incorrect email format: ${val}`);
    }
}

// Users class
class Users {
    #users;

    constructor() {
        this.#users = new Map();
    }

    add(name, surname, email) {
        try {
            this.#users.set(email, new User(name, surname, email));
        } catch(e) {
            console.log(e.message);
        }
    }

    delete(email) {
        return this.#users.delete(email);
    }

    get(email) {
        return this.#users.get(email);
    }

    getAll(sortBy) {
        return [...this.#users]
            .sort((u1, u2) => u1[1][sortBy] > u2[1][sortBy] ? 1 : -1)
            .map(u => u[1]);
    }
}

// Test
let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com"); // duplicate email
users.add("Xxxx", "Oooo", "dddd@gmail.com");

console.log(users.get("dddd@gmail.com")); // single user
console.log(users.getAll("name").map(u => u.name));    
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));