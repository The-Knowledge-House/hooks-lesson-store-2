import "./App.css";
import HomePage from "./components/HomePage";
import { useState } from "react";

function App() {
  const [itemCurrentlyOnSale, setItemCurrentlyOnSale] = useState("A Hammer");
  const [editable, setEditable] = useState(true);

  const toggleEditSaleItem = (event) => setEditable(!editable);

  const handleItemCurrentlyOnSaleChange = (event) => {
    const itemCurrentlyOnSale = event.target.value;
    setItemCurrentlyOnSale(itemCurrentlyOnSale);
  };

  return (
    <div className="App">
      <HomePage
        saleItem={itemCurrentlyOnSale}
        editable={editable}
        toggleEditSaleItem={toggleEditSaleItem}
        handleItemCurrentlyOnSaleChange={handleItemCurrentlyOnSaleChange}
      />
    </div>
  );
}

export default App;
