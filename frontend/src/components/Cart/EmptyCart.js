import { Fragment } from "react";
import "./EmptyCart.css";

const EmptyCart = () => {
  return (
    <Fragment>
      <div className="cartEmptyDiv">
        <img
          src="/emptycart.png"
          className="cartEmptyImg"
          alt="No items in your Cart"
        />
      </div>
      <h2 className="cartEmptyHead">Your cart is empty.</h2>
      <p className="cartEmptyPara">Please, Add items to make me happy.</p>
    </Fragment>
  );
};

export default EmptyCart;
