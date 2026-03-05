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

// Function to show one contact
function showContact(contactList, index) {
    if (contactList instanceof Array && contactList[index]) {
        console.log(contactList[index].name + " / " +
                    contactList[index].phone + " / " +
                    contactList[index].email);
    }
}

// Function to show all contacts
function showAllContacts(contactList) {
    if (contactList instanceof Array) {
        for (let i = 0; i < contactList.length; i++) {
            console.log(contactList[i].name + " / " +
                        contactList[i].phone + " / " +
                        contactList[i].email);
        }
    }
}

// Function to add a new contact
function addNewContact(contactList, name, phone, email) {
    if (contactList instanceof Array && name && phone && email) {
        contactList.push({
            name: name,
            phone: phone,
            email: email
        });
    }
}

// Calling the functions
showContact(contacts, 0);           // show first contact
showAllContacts(contacts);          // show all contacts
addNewContact(contacts, "Anna Marie Zolina", "09123456789", "anna@email.com");

console.log("After adding new contact:");
showAllContacts(contacts);