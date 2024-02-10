import React from "react";
import { useParams } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import './warehousedetails.scss';
import EditIcon from '../../assets/icons/edit-24px.svg';
import Dropdown from '../../assets/icons/arrow_drop_down-24px.svg';
import WarehouseInventory from '../WarehouseInventory/WarehouseInventory';


export default function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [inventoryDetails, setInventoryDetails] = useState([]);

  const getWarehouseDetails = async () => {
    try{
        const urlAPI = `http://localhost:8088/api/warehouses/${id}`;
        const response = await axios.get(urlAPI);
        setWarehouseDetails(response.data)
    }
    catch(error){
        console.error("Error fetching warehouse: ", error.message)
    }
    
  }

  const getInventoryDetails = async () => {
    try{
        const urlAPI = `http://localhost:8088/inventory/${id}`;
        const response = await axios.get(urlAPI);
        setInventoryDetails(response.data)
    }
    catch(error){
        console.error("Error fetching inventory: ", error.message)
    }
    
  }

//   if (inventoryDetails.warehouse_id === id){
//     return (invent)
//   }

  useEffect(() => {
    getWarehouseDetails();
  });

  useEffect(() =>{
    getInventoryDetails();
  })


  

  return (
    <section className="warehouseDetails">

            <div className="warehouseDetails--heading">
                <div className="warehouseDetails--title">
                    <img className="warehouseDetails--arrow" src={arrowBack} alt="Back" />
                    <h1>{warehouseDetails.warehouse_name}</h1>
                </div>
                <div className="warehouseDetails--editsection">
                    <button className="__button">
                        <img src={EditIcon} alt="Edit"/>
                        Edit
                    </button>
                </div>
                
            </div>
            <div className="warehouseDetails--contact">
                    <div className="warehouseDetails--address">
                        <h5>WAREHOUSE ADDRESS</h5>
                        <p>{warehouseDetails.address}</p>
                        <p>{warehouseDetails.city}, {warehouseDetails.country}</p>
                    </div>
                    <div className="container__vertical"><div className="container__vertical-line"></div></div>
                    <div className="warehouseDetails--contactinfo">
                        <div className="warehouseDetails--contactinfo-1"> 
                            <h5>CONTACT NAME:</h5>
                            <p>{warehouseDetails.contact_name}</p>
                            <p>{warehouseDetails.contact_position}</p>
                        </div>
                        <div className="warehouseDetails--contactinfo-2">
                            <h5>CONTACT INFORMATION</h5>
                            <p>{warehouseDetails.contact_phone}</p>
                            <p>{warehouseDetails.contact_email}</p>
                        </div>
                    </div>
                    
            </div>
            <div className="warehouseDetails--inventorylist">
              <div className="warehouse-list-title">
                <h5>ITEM</h5>
                <img src={Dropdown} alt="filter" />
                </div>
                <div className="warehouse-list-title">
                <h5>CATEGORY</h5>
                <img src={Dropdown} alt="filter" />
                </div>
                <div className="warehouse-list-title">
                <h5>STATUS</h5>
                <img src={Dropdown} alt="filter" />
                </div>
                <div className="warehouse-list-title">
                <h5>QUANTITY</h5>
                <img src={Dropdown} alt="filter" />
                </div>
                <div className="warehouse-list-title">
                <h5>ACTIONS</h5>
                </div>
            </div>
            <div className="inventory--list">
              <WarehouseInventory warehouseDetails={warehouseDetails}  inventoryDetails={inventoryDetails}/>
            </div>
    </section>
    
  )
}
