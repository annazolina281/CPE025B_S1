function getInventoryValuation(inventory) {
    const inventoryValuation = {};

    for (const item of inventory) {
        if (item.qty > 0) {
            const category = item.category;
            const value = item.qty * item.price;

            if (!inventoryValuation[category]) {
                inventoryValuation[category] = 0;
            }

            inventoryValuation[category] += value;
        }
    }

    return inventoryValuation;
}

// Test Code
const testInventory = [
    { name: 'Monitor', qty: 2, price: 200, category: 'Tech' },
    { name: 'Mouse', qty: 0, price: 50, category: 'Tech' },
    { name: 'Desk', qty: 1, price: 300, category: 'Furniture' },
    { name: 'Lamp', qty: 2, price: 50, category: 'Furniture' }
];
console.log(getInventoryValuation(testInventory)); 
