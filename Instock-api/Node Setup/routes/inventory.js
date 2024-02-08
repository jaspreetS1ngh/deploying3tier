const express = require("express");
const router = express.Router();
const fs = require("fs");
const { fetchInventories, addInventoryItem } = require("../../controllers/inventoryControllers");

const fetchInventory = () => {
  const filePath = "./data/inventory.json";
  const data = JSON.parse(fs.readFileSync(filePath));
  return data;
};

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log("Received request for inventory item with id:", id);
  const currentItem = fetchInventory().find(item => item.id === parseInt(id));
  console.log("Found item:", currentItem);

  if (currentItem) {
    res.json(currentItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, description, category, status, warehouse_id } = req.body;

  const inventoryData = fetchInventory();

  const index = inventoryData.findIndex(item => item.id === parseInt(id, 10));

  if (index !== -1) {
    inventoryData[index] = {
      id: parseInt(id, 10),
      warehouse_id: parseInt(warehouse_id, 10),
      item_name,
      description,
      category,
      status,
      quantity: inventoryData[index].quantity,
    };

    fs.writeFileSync("./data/inventory.json", JSON.stringify(inventoryData, null, 2));

    res.json({ success: true, message: `Item with id ${id} updated successfully.` });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

router.get("/", (req, res) => {
  const inventories = fetchInventories();
  res.status(200).json(inventories);
});

router.post("/", (req, res) => {
  const { itemName, description, category, status, quantity, warehouseName } = req.body;
  if (!itemName || !description || !category || !status || !quantity || !warehouseName) {
    return res.status(400).send("Missing required fields");
  }
  const newItem = addInventoryItem({
    itemName,
    description,
    category,
    status,
    quantity: Number(quantity),
    warehouseName,
  });
  res.status(201).json(newItem);
});

module.exports = router;
