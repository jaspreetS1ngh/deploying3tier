const express = require('express');
const router = express.Router();


const knex = require('knex')(require('../../DB Setup/knexfile'))


//ADD NEW WAREHOUSE
router.post("/api/warehouses", async (req,res) =>{
    try{
        const newWarehouseData = req.body
        const newWarehouse = await knex('warehouse').insert(newWarehouseData)

        const newWarehouseReturnData = await knex.select('*').from('warehouse').where({id:newWarehouse[0]})
        res.json(newWarehouseReturnData)
    }
    catch(error){

    }
})






















module.exports = router