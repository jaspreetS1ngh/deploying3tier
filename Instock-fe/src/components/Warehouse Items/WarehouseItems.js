import React from 'react';
import { Link } from 'react-router-dom';

const List = (props) => {
    return (
        <>
        
            {props.warehouses.map((warehouse) => (
                    <div className="warehouse--container-list" key={warehouse.id}>
                        <div className='warehouse-name'>
                            <Link to={`/warehouse/${warehouse.id}`} key={warehouse.id} className="warehouse--link">
                                {warehouse.name}
                            </Link>
                            <img src="" alt="contact name" />
                        </div>
                        <p>{warehouse.address}</p>
                        <div className="contact-information">
                            <p>{warehouse.contact}</p>
                            <p>{warehouse.email}</p>
                        </div>
                        <div className='action--icons'>
                            <img src="" alt="delete" />
                            <img src="" alt="edit" />
                        </div>
                    </div>
            ))}
        </>
    );
}

export default List;