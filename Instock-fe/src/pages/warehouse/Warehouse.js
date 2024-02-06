import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import WarehouseDetails from "../../components/warehouseDetails/WarehouseDetails";

function Warehouse() {
  return (
    <>
      <Header />
      <WarehouseDetails className="content" />
      <Footer />
    </>
  );
}

export default Warehouse;
