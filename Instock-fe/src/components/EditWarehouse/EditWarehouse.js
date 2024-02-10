import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./EditWarehouse.scss";
const EditWarehouse = () => {
    const { id } = useParams();
  
    const [formData, setFormData] = useState({
      warehouse_name: '',
      address: '',
      city: '',
      country: '',
      contact_name: '',
      contact_position: '',
      contact_phone: '',
      contact_email: '',
    });
  
    useEffect(() => {
      const fetchWarehouseData = async () => {
        try {
          const response = await axios.get(`http://localhost:8088/api/warehouses/${id}`);
          const warehouseData = response.data; 
          setFormData({ ...warehouseData });
        } catch (error) {
          console.error('Error fetching warehouse data:', error);
        }
      };
  
      fetchWarehouseData();
    }, [id]);
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
  
    const handleCancel = () => {
      alert('Cancelled!');
    };
  
    const handleSave = async () => {
      try {
        const response = await axios.put(`http://localhost:8088/api/warehouses/${id}`, formData);
        console.log(response.data);
        alert(response.data.message);
      } catch (error) {
        console.error('Error updating warehouse:', error);
        alert('Failed to update warehouse. Please try again.');
      }
    };

  return (
    <form>
      <h1>Edit Warehouse</h1>
      <label htmlFor="warehousename">Warehouse Name</label>
            <input
            type="text"
            id="warehousename"
            name="warehouse_name"  
            value={formData.warehouse_name}
            onChange={handleInputChange}
            />



      <label htmlFor="streetAddress">Street Address</label>
      <input
        type="text"
        id="streetAddress"
        name="address"
        placeholder="Enter street address"
        value={formData.address}
        onChange={handleInputChange}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Enter city"
        value={formData.city}
        onChange={handleInputChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Enter country"
        value={formData.country}
        onChange={handleInputChange}
      />

      <div>
        <h2>Contact Details</h2>
        <label htmlFor="contactName">Contact Name</label>
        <input
          type="text"
          id="contactName"
          name="contact_name"
          placeholder="Enter contact name"
          value={formData.contact_name}
          onChange={handleInputChange}
        />

        <label htmlFor="contactPosition">Position</label>
        <input
          type="text"
          id="contactPosition"
          name="contact_position"
          placeholder="Enter contact position"
          value={formData.contact_position}
          onChange={handleInputChange}
        />

        <label htmlFor="contactEmail">Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contact_email"
          placeholder="Enter contact email (e.g., glyon@instock.com)"
          value={formData.contact_email}
          onChange={handleInputChange}
        />

        <label htmlFor="contactPhone">Phone</label>
        <input
          type="tel"
          id="contactPhone"
          name="contact_phone"
          placeholder="+(647)507-0911"
          value={formData.contact_phone}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditWarehouse;
