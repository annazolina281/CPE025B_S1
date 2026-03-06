class Vehicle {
constructor(id, type) {
    this.id = id;
    this.type = type;
    this.isDeployed = false;
}
}

class FleetManager {
constructor() {
    this.vehicles = [];
}

addVehicle(vehicle) {
    this.vehicles.push(vehicle);
}

deployVehicle(id) {
    const vehicle = this.vehicles.find(function(v) {
        return v.id === id;
    });

    if (vehicle) {
        vehicle.isDeployed = true;
    } else {
        return undefined;
    }
}

getAvailableVehicles() {
    return this.vehicles.filter(function(v) {
        return v.isDeployed === false;
    });
}
}

// Test Entity Instantiation
console.log("*** Test Entity Instantiation***");
const testVehicle = new Vehicle("V01", "Truck");
console.log(testVehicle);

// Test Composition and Insertion
console.log("\n*** Test Composition and Insertion***");
const fleet = new FleetManager();
fleet.addVehicle(testVehicle);
fleet.addVehicle(new Vehicle("V02", "Van"));
fleet.addVehicle(new Vehicle("V03", "Drone"));
console.log(fleet.vehicles.length);

// Test State Mutation
console.log("\n*** Test State Mutation ***");
fleet.deployVehicle("V02");
const deployedVehicle = fleet.vehicles.find(function(v) {
    return v.id === "V02";
});
console.log(deployedVehicle.isDeployed);

// Test Data Filtering
console.log("\n*** Test Data Filtering ***");
const available = fleet.getAvailableVehicles();
console.log(available.length);
console.log(available.map(function(v) {
    return v.id;
}));