const express = require("express");
const router = express.Router();
const { fetchInventories, addInventoryItem } = require("../../Controllers/inventoryControllers");


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