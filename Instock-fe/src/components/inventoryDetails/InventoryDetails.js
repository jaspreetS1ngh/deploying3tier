import React from "react";
import { useParams } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import "./InventoryDetails.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function InventoryDetails() {
  // const { id } = useParams();
  // const [itemDetails, setItemDetails] = useState([]);
  const [warehouseName, setWarehouseName] = useState("");

  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    description: '',
    category: '',
    status: '',
    quantity:'',
    warehouse_id:'',
  }); 

  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
  }, [id]);

const fetchData = async (parmid) => {
    try {
      const response = await axios.get(`http://localhost:8088/inventory/${parmid}`);
      const currentItem = response.data;
setItemDetails({
          item_name: currentItem.item_name,
          description: currentItem.description,
          category: currentItem.category,
          status: currentItem.status ,
          quantity: currentItem.quantity,
          warehouse_id: currentItem.warehouse_id,
          
        });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };








  // const getItemDetails = () => {
  //   axios
  //     .get(`http://localhost:8088/inventory/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       setItemDetails(res.data.inventoriesData[0]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getWarehouseName = () => {
    const url = `http://localhost:8088/api/warehouses/${itemDetails.warehouseid}`;
    axios
      .get(url)
      .then((res) => {
        setWarehouseName(res.data.warehouseData[0].warehouse_name);
      })
      .catch((error) => {
        console.log(error);
      });
    // });
  };

  // useEffect(() => {
  //   getItemDetails();
  // }, []);
  useEffect(() => {
    getWarehouseName();
  }, [itemDetails]);

  // const { item_name, category, description, status, quantity, warehouse_id } =
  //   itemDetails;

  return (
    <>
      <section className="item">
        <form className="itemForm">
          <div className="item-top">
            <Link to={`/inventory`}>
              <div className="item-top__backIcon">
                <img
                  src={backIcon}
                  alt="arrow-back-icon"
                  className="item-top__backIcon"
                />
              </div>
            </Link>

            <h1 className="item-top__title">{itemDetails.name}</h1>
            <Link to={`/inventory/${id}/edit`}>
              <div className="item-top__edit">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="item-top__editIcon"
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                    fill="#FFFFFF"
                  />
                </svg>{" "}
                <span className="item-top__editText">Edit</span>
              </div>
            </Link>
          </div>
          <div className="item-bottom">
            <div className="item-bottom__left">
              <div className="item-bottom__left__description">
                <h3 className="item-bottom__title item-bottom__left__descriptionTitle">
                  ITEM DESCRIPTION
                </h3>
                <span className="item-bottom__left__descriptionText">
                  {itemDetails.description}
                </span>
              </div>
              <div className="item-bottom__right__category">
                <h3 className="item-bottom__title  item-bottom__right__categoryTitle">
                  CATEGORY
                </h3>
                <span className="item-bottom__right__categoryText">
                  {itemDetails.category}
                </span>
              </div>
            </div>

            <div className="item-bottom__right-wrapper">
              <div className="item-bottom__right item-bottom__right__uppper">
                <div className="item-bottom__right__status">
                  <h3 className="item-bottom__title  item-bottom__right__statusTitle">
                    STATUS
                  </h3>
                  {itemDetails.status === "In Stock" && (
                    <div className="item-bottom__right__status">
                      <span
                        className="item-bottom__right__statusText item-bottom__right__statusText--inStcok"
                        id="inStock"
                      >
                        In Stock
                      </span>
                    </div>
                  )}
                  {itemDetails.status === "Out of Stock" && (
                    <div className="item-bottom__right__status">
                      <span
                        className="item-bottom__right__statusText  item-bottom__right__statusText--outOfStock"
                        id="outOfStock"
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="item-bottom__right__qty">
                  <h3 className="item-bottom__title item-bottom__right__qtyTitle">
                    QUANTITY
                  </h3>
                  <span className="item-bottom__right__qtyText">
                    {itemDetails.quantity}
                  </span>
                </div>
              </div>
              <div className="item-bottom__right item-bottom__right__bottom">
                <div className="item-bottom__right__warehouse">
                  <h3 className="item-bottom__title item-bottom__right__warehouseTitle">
                    WAREHOUSE
                  </h3>
                  <span className="item-bottom__right__warehouseText">
                    {itemDetails.warehouseName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
