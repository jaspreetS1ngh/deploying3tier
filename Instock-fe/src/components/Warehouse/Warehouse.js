import WarehouseItems from "../Warehouse Items/WarehouseItems";
import Header from "../header/Header";




function Warehouse() {
    return (
      <section>
        <Header/>
        <div className="container--warehouse">
            <h1>Warehouses</h1>
            {/* Insert search here */}
            {/* Insert Add New Warehouse*/}
        </div>
        <div className="warehouse-list-header">
            <div className="warehouse-list-title"> 
                <h5>WAREHOUSE</h5>
                <img src="#" alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>ADDRESS</h5>
                <img src="#" alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>CONTACT NAME</h5>
                <img src="#" alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>CONTACT INFORMATION</h5>
                <img src="#" alt="filter"/>
            </div>
            <div className="warehouse-list-title"> 
                <h5>ACTIONS</h5>
            </div>
        </div>
        <div className="warehouse-list">
            {/* insert map function here */}
            <WarehouseItems />
        </div>
      </section>
    );
  }
  




export default Warehouse;