const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const inventoryFilePath = path.join(__dirname, '..', "Node Setup", 'data', 'inventory.json');
console.log(inventoryFilePath);

const fetchInventories = () => {
  return JSON.parse(fs.readFileSync(inventoryFilePath));
};

const addInventoryItem = (newItem) => {
  const inventories = fetchInventories();
  const newInventoryItem = {
    ...newItem,
    id: uuidv4(), 
  };
  const updatedInventories = [...inventories, newInventoryItem];
  fs.writeFileSync(inventoryFilePath, JSON.stringify(updatedInventories, null, 2));
  return newInventoryItem;
};

module.exports = { fetchInventories, addInventoryItem };
