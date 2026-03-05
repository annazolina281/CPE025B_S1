// Initialize contacts
let contacts = [
    { name: "Linus Torvalds", role: "System Admin", skills: ["Linux", "Git", "Kernels"], availability: true },
    { name: "Ada Lovelace", role: "Logic Analyst", skills: ["Algorithms", "Math", "Analytics"], availability: false },
    { name: "Alan Turing", role: "Cryptographer", skills: ["Logic", "Enigma", "Security"], availability: true }
];

// Function to show one contact (first skill only)
function showContact(index) {
    if (contacts[index]) {
        let c = contacts[index];
        console.log(c.name + " | " + c.role + " | First Skill: " + c.skills[0]);
    } else {
        console.log("Invalid index.");
    }
}

// Function to show all contact names
function showAllContacts() {
    for (let i = 0; i < contacts.length; i++) {
        console.log(contacts[i].name);
    }
}

// Function to add new contact
function addContact(name, role, skill) {
    if (name && role && skill) {
        contacts.push({ name: name, role: role, skills: [skill], availability: true });
        console.log(name + " added.");
    } else {
        console.log("All fields are required!");
    }
}

// Function to search by name
function searchContact(name) {
    let found = false;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name.toLowerCase() === name.toLowerCase()) {
            let status = contacts[i].availability ? "Available" : "Busy";
            console.log("Role: " + contacts[i].role + " | Availability: " + status);
            found = true;
            break;
        }
    }
    if (!found) console.log("Contact not found.");
}

// Persistent loop
while (true) {
    let action = prompt("Action: show, all, add, search, quit").toLowerCase();

    if (action === "quit") {
        alert("Goodbye!");
        break;
    } else if (action === "show") {
        let index = parseInt(prompt("Enter contact index:"));
        showContact(index);
    } else if (action === "all") {
        showAllContacts();
    } else if (action === "add") {
        let name = prompt("Name:");
        let role = prompt("Role:");
        let skill = prompt("Skill:");
        addContact(name, role, skill);
    } else if (action === "search") {
        let name = prompt("Name to search:");
        searchContact(name);
    } else {
        console.log("Invalid action.");
    }
}