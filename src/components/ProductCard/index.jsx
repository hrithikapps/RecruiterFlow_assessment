import React from "react";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../utils/productsSlice";

const ProductCard = ({ image, title, price, id }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(deleteProduct(id));
  };
  return (
    <div className={styles.root}>
      <div className={styles.image_container}>
        <img className={styles.product_image} src={image} alt={title} />
      </div>

      <div className={styles.description_container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>${price}</div>
        <button className={styles.delete} onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
