let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
}, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu"
}];

let action = prompt("Choose: show, all, add, search, quit");

while (action !== "quit") {

    // SHOW contact by index
    if (action === "show") {

        let index = prompt("Enter contact index:");

        if (index >= 0 && index < contacts.length) {
            console.log(contacts[index].name, contacts[index].phone, contacts[index].email);
        } else {
            console.log("Invalid index.");
        }
    }

    // SHOW ALL contacts
    else if (action === "all") {

        for (let i = 0; i < contacts.length; i++) {
            console.log(contacts[i].name, contacts[i].phone, contacts[i].email);
        }
    }

    // ADD new contact
    else if (action === "add") {

        let name = prompt("Enter name:");
        let phone = prompt("Enter phone:");
        let email = prompt("Enter email:");

        if (name && phone && email) {
            contacts.push({
                name: name,
                phone: phone,
                email: email
            });
            console.log("Contact added.");
        } else {
            console.log("Missing data. Contact not added.");
        }
    }

    // SEARCH contact by name
    else if (action === "search") {

        let searchName = prompt("Enter name to search:");
        let found = false;

        for (let i = 0; i < contacts.length; i++) {

            if (contacts[i].name === searchName) {
                console.log("Found:", contacts[i].phone, contacts[i].email);
                found = true;
                break;
            }
        }

        if (!found) {
            console.log("Contact not found.");
        }
    }

    else {
        console.log("Invalid option.");
    }

    action = prompt("Choose: show, all, add, search, quit");
}

console.log("Program finished.");