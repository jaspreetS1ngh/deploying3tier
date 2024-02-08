const express = require("express");
const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const fs = require("fs");

const fetchWarehouse = () => {
//    console.log(JSON.parse(fs.readFileSync("./data/warehouse.json")))
  return JSON.parse(fs.readFileSync("./data/warehouse.json"));
};
const fetchInventory = () => {
  //    console.log(JSON.parse(fs.readFileSync("./data/warehouse.json")))
    return JSON.parse(fs.readFileSync("./data/inventory.json"));
  };


const addWarehouse = (warehouse) => {
  const newWarehouse = fetchWarehouse();
  fs.writeFileSync(
    "./data/warehouse.json",
    JSON.stringify([...newWarehouse, warehouse])
  );
  return newWarehouse;
};

//GET ALL WAREHOUSES

router.get('/', (req,res) =>{
  const warehouseList = fetchWarehouse();
  const warehouseListed = warehouseList.map((warehouse) =>{
    return {
      id: warehouse["id"],
      warehouse_name: warehouse["warehouse_name"],
      address: warehouse['address'],
      contact_name: warehouse['contact_name'],
      contact_phone: warehouse['contact_phone'],
      contact_email: warehouse['contact_email'],
    }
  })
  console.log(warehouseListed)
  if(warehouseListed){
    return res.status(200).json({warehouseListed});
  }
})

//GET SINGLE WAREHOUSE
router.get('/:id', (req,res) =>{
    const {id} = req.params;

    const warehouseMatch = fetchWarehouse().find((warehouse) => warehouse.id == id);

    console.log(warehouseMatch)
    console.log(id)
    console.log(fetchWarehouse())


    if(!warehouseMatch){
        return res.status(404).json({message:"Warehouse does not exist. Please check and try again"})
    }
    
    return res.status(200).json(warehouseMatch)
})

// const knex = require('knex')(require('../../DB Setup/knexfile'))



//ADD NEW WAREHOUSE
router.post("/", (req, res) => {
  try {
    let {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }
    // const newWarehouse = await knex('warehouse').insert(newWarehouseData)

    // const newWarehouseReturnData = await knex.select('*').from('warehouse').where({id:newWarehouse[0]})
    // res.json(newWarehouseReturnData)

    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({ message: "Email format unacceptable." });
    }

    if (!phoneRegex.test(contact_phone)) {
      return res
        .status(400)
        .json({
          message:
            "Phone format unacceptable. Acceptable format: +1(234) 567-8910 ",
        });
    }

    let newWarehouseDetails = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };
    // console.log(newWarehouseDetails);
    let recentWarehouse = addWarehouse(newWarehouseDetails);

    return res.status(201).json({ recentWarehouse });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
