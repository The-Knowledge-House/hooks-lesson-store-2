const HomePage = (props) => {
  return (
    <div>
      <h1>My Hardware Store</h1>
      <span>Currently on Sale: {props.saleItem} </span>
      <span>
        <button onClick={props.toggleEditSaleItem}>
          {props.editable ? "Hide" : "Edit Sale Item"}
        </button>
      </span>

      <div>
        {props.editable ? (
          <div>
            <input
              onChange={props.handleItemCurrentlyOnSaleChange}
              type="text"
              vale={props.itemCurrentlyOnSale}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
