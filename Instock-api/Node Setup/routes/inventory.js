const express = require("express");
const router = express.Router();
const fs = require("fs");

const fetchInventory = () => {
  const filePath = "./data/inventory.json";
  console.log("Reading file from path:", filePath);
  const data = JSON.parse(fs.readFileSync(filePath));
  console.log("Fetched inventory data:", data);
  return data;
};

router.get('/api/inventory/:id', (req, res) => {
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

router.put('/api/inventory/:id', (req, res) => {
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

module.exports = router;
