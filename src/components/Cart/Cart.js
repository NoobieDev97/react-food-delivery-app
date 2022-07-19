import { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `Rs ${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          currState={isOrderPlaced}
        />
      ))}
    </ul>
  );

  const finalOrderDisplayHandler = () => {
    setIsOrderPlaced(true);
  };
  return (
    <Fragment>
      {!isOrderPlaced && (
        <Modal onClose={props.onClose}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {hasItems && (
              <button
                className={classes.button}
                onClick={finalOrderDisplayHandler}
              >
                Order
              </button>
            )}
          </div>
        </Modal>
      )}
      {isOrderPlaced && (
        <Modal onClose={props.onClose}>
          <h1
            style={{
              color: "green",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Order Placed!
          </h1>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <h4 style={{ textAlign: "center" }}>Your dish is beeing cooked</h4>
          <h5 style={{ textAlign: "center" }}>
            Thank you for placing your order with us.
          </h5>
        </Modal>
      )}
    </Fragment>
  );
};

export default Cart;
