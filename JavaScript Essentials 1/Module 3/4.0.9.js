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

// ask user what to do
let action = prompt("What do you want to do with the list? (first, last, new)");

if (action === "first") {

    console.log(`${contacts[0].name} / ${contacts[0].phone} / ${contacts[0].email}`);

} else if (action === "last") {

    let last = contacts.length - 1;
    console.log(`${contacts[last].name} / ${contacts[last].phone} / ${contacts[last].email}`);

} else if (action === "new") {

    let name = prompt("Enter name:");
    let phone = prompt("Enter phone:");
    let email = prompt("Enter email:");

    if (name && phone && email) {
        contacts.push({ name, phone, email });
        console.log("New contact added.");
    } else {
        console.log("Contact not added. Missing information.");
    }

} else {
    console.log("Invalid option.");
}