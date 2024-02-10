import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./EditInventory.scss";

function EditInventory() {
  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity:'',
    warehouse_id: '',
    warehouse_name:''
  });
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (parmid) => {
    try {
      const response = await axios.get(`http://localhost:8088/inventory/${parmid}`);
      const currentItem = response.data;
  
      if (currentItem) {
        const warehouseResponse = await axios.get(`http://localhost:8088/api/warehouses/${currentItem.warehouse_id}`);
        const warehouseData = warehouseResponse.data;
        
        setItemDetails({
          item_name: currentItem.item_name,
          description: currentItem.description,
          category: currentItem.category,
          status: currentItem.status ,
          quantity: currentItem.quantity,
          warehouse_id: currentItem.warehouse_id,
          warehouse_name: warehouseData.warehouse_name 
        });
      } else {
        console.error(`Item with id ${id} not found.`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8088/inventory/cat/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchData(id);
    fetchCategories();
    fetchWarehouses();
  }, [id]);
    
const fetchWarehouses = async () => {
  try {
    const response = await axios.get('http://localhost:8088/api/warehouses/list/warehouses');
    setWarehouses(response.data);
  } catch (error) {
    console.error('Error fetching warehouses:', error);
  }
};



const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "warehouse_name") {
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  } else {
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }
};



const handleSave = async () => {
  try {
    const selectedWarehouse = warehouses.find(warehouse => warehouse.warehouse_name == itemDetails.warehouse_name);
    if (!selectedWarehouse) {
      alert('Selected warehouse not found.');
      return;
  }
  console.log(selectedWarehouse);
    const response = await axios.put(`http://localhost:8088/inventory/${id}`, {
      ...itemDetails,
      warehouse_id: selectedWarehouse.warehouse_id,
      quantity: itemDetails.quantity
      
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

  
  return (
    <div className="edit">
      <h1>Item Details</h1>
      <form className="edit__form">
        <div className="edit__form-first">
          <label className="edit__form-first--name">Item Name</label>
          <input
            type="text"
            name="item_name"
            value={itemDetails.item_name}
            onChange={handleChange}
            className="edit__form-name--value"
          />
          <label className="edit__form-first--description">Description</label>
          <input
            type="text"
            name="description"
            value={itemDetails.description}
            onChange={handleChange}
            className="edit__form-description--value"
          />
          <select
              name="category"
              value={itemDetails.category}
              onChange={handleChange}
              className="edit__form-category--value">
              {categories.map((category, index) => (
                <option key={index} value={category.category}>
                  {category.category}
                </option>
              ))}
          </select>
        </div>
        <div className="edit__form-second">
          <h3>Item Availability</h3>
          <div className="edit__form-second--status">
            <label>
              <input type="radio" name="status" value="In Stock"  checked={itemDetails.status === 'In Stock'} onChange={handleChange}/>
              In Stock</label>
            <label>
              <input type="radio" name="status" value="Out of Stock" checked={itemDetails.status === 'Out of Stock'} onChange={handleChange}/>
              Out of Stock
            </label>
          </div>

          {itemDetails.status === 'In Stock' && (
            <div className="edit__form-second--quantity">
              <label>Quantity</label>
              <input type="text" name="quantity" value={itemDetails.quantity} onChange={handleChange} className="edit__form-quantity--value"/>
            </div>
          )}
          <select
              name="warehouse_name"
              value={itemDetails.warehouse_name}
              onChange={handleChange}
              className="edit__form-second--warehouse---value"
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>


          <div className="edit__form-second--buttons">
            <button type="button" className="edit__form-second--buttons---cancel">
              CANCEL
            </button>
            <button type="button" className="edit__form-second--buttons---save" onClick={handleSave}>
              SAVE
              </button>
          </div>
        
          </div>
      </form>
    </div>
  );
}

export default EditInventory;
