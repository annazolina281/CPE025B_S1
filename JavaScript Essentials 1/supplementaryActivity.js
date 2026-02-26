// 1. Create the Directory (Array of Objects)

let teamDirectory = [
    {
        name: "Leo Brooks",
        role: "Designer",
        skills: ["UI", "UX", "Figma"],
        available: true
    },
    {
        name: "Sasha Ivana",
        role: "Developer",
        skills: ["HTML", "CSS", "JS"],
        available: false
    },
    {
        name: "Jordan Lee",
        role: "Manager",
        skills: ["Planning", "Agile"],
        available: true
    }
];


// 2. Add a New Specialist using push()

teamDirectory.push({
    name: "Casey Moore",
    role: "QA Engineer",
    skills: ["Testing", "Debugging"],
    available: true
});


// 3. Update Availability (Sasha finished project)

teamDirectory[1].available = true;


// 4. Data Extraction

// a. Name and first skill of the first team member
console.log("First Member Name:", teamDirectory[0].name);
console.log("First Skill:", teamDirectory[0].skills[0]);

// b. Name and total number of skills of the last member
let lastMember = teamDirectory[teamDirectory.length - 1];

console.log("Last Member Name:", lastMember.name);
console.log("Total Skills of Last Member:", lastMember.skills.length);

// c. Total number of people in the directory
console.log("Total People in Directory:", teamDirectory.length);