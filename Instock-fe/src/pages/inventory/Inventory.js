import React from "react";
import InventoryList from "../../components/inventoryList/InventoryList";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
export default function Inventory() {
  return (
    <>
      <Header />
      <InventoryList />
      <Footer />
    </>
  );
}
