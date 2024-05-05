import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./DeleteInventory.scss";

function DeleteInventory({ inventory, onDeleted, onCancelled }) {
  function cancelDeletion(){
    onCancelled()
  }

  function deleteInventory(){
    axios.delete('http://backend:8088/api/inventories/' + inventory.id)
      .then(response => {
        onDeleted(inventory)
      })
      .catch(error => {
        console.error(error);
        onCancelled()
        alert(error.response.data.message)
      })
  }
  

  
  return (
    <div className="delete">
      
      <div className="delete__content">
        <h1 className="delete__content--title">Delete {inventory.item_name} inventory item?</h1>
        <span className="delete__content--close" onClick={cancelDeletion}>&times;</span>

        <div className="delete__content--text">
          Please confirm that you'd like to delete {inventory.item_name} from the inventory list.
          You won't be able to undo this action.
        </div>

        <div className="delete__content--actions">
          <button type="button" className="delete__content--actions__cancel" onClick={cancelDeletion}>Cancel</button>
          <button type="button" className="delete__content--actions__delete" onClick={deleteInventory}>Delete</button>
        </div>

      </div>
      
    </div>
  );
}

export default DeleteInventory;
