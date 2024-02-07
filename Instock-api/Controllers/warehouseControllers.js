const knex = require("knex")(require("../knexfile"));
const { v4:uuidv4 } =require("uuid");



// put and edit warehouse
exports.updateWarehouse = (req, res) => {
  const obj = {
    id: req.body.id,
    warehouse_name: req.body.warehouse_name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact_name: req.body.contact_name,
    contact_position: req.body.contact_position,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
  };
  knex("warehouses")
    .update(obj)
    .where({ id: req.params.id })
    .then((_data) => {
      knex("warehouses")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(404).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

exports.addWarehouse = (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(404)
      .send(
        "Please make sure to provide warehouse_name, address, city, country, contact_name, contact_position, contact_phone and contact_email fields in a request"
      );
  }

  const newWarehouseId = uuidv4();
  knex("warehouses")
    .insert({ ...req.body, id: newWarehouseId })
    .then((_data) => {
      knex("warehouses")
        .where({ id: newWarehouseId })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) => res.status(404).send(`Error creating Warehouse: ${err}`));
};


// delete warehouse by id

exports.deleteWarehouse = (req, res) => {
  knex("warehouses")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(204)
        .send(`Warehouse with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(404).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};





