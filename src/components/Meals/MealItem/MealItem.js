import { useContext, useState } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const [showItemForm, setShowItemForm] = useState(false);
  const cartCtx = useContext(CartContext);
  const price = `Rs ${props.price}`;

  const itemFormDisplayHandler = () => {
    setShowItemForm(true);
  };

  const addtoCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  console.log(props);

  return (
    <li className={classes.meal}>
      <div style={{ width: "70%" }}>
        <h3 style={{ textTransform: "capitalize" }}>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div className={classes.imagediv}>
          <img src={props.img} alt={props.name} />
        </div>
      </div>
      <div>
        {!showItemForm && (
          <button onClick={itemFormDisplayHandler}>Add item to Cart</button>
        )}
        {showItemForm && (
          <MealItemForm id={props.id} onAddToCart={addtoCartHandler} />
        )}
      </div>
    </li>
  );
};

export default MealItem;
