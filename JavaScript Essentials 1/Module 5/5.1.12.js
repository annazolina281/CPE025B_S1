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

let showAllContacts = contacts => {
    contacts.forEach(c => console.log(`${c.name} / ${c.phone} / ${c.email}`));
}

let addNewContact = (contacts, name, phone, email) => {
    if (contacts && name && phone && email) {
        contacts.push({ name, phone, email });
    }
}

// Simple sort function
let sortContacts = (contacts, field) => {
    contacts.sort((a, b) => a[field].localeCompare(b[field]));
}

// Example usage
console.log("Before sorting:");
showAllContacts(contacts);

sortContacts(contacts, 'name');
console.log("\nAfter sorting by name:");
showAllContacts(contacts);

sortContacts(contacts, 'phone');
console.log("\nAfter sorting by phone:");
showAllContacts(contacts);

sortContacts(contacts, 'email');
console.log("\nAfter sorting by email:");
showAllContacts(contacts);