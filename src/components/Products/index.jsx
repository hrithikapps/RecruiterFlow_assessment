import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import MessageBox from "../MessageBox";
import Spinner from "../Spinner";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../utils/productsSlice";

const limit = 12;
const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.app);
  const spinnerRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const pageRef = useRef(1);
  const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState();

  const fetchDataFromAPI = async (page = pageRef.current) => {
    try {
      setIsLoading(true);
      const resPro = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      );
      const res = await resPro.json();
      const products = res.products || [];
      dispatch(addProducts(products));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  //Fetch more Products using infinite scrolling
  useEffect(() => {
    const ref = spinnerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => ref && observer.unobserve(ref);
  }, [isSpinnerRefVisible]);

  useEffect(() => {
    if (isIntersecting) {
      fetchDataFromAPI(pageRef.current + 1);
      pageRef.current = pageRef.current + 1;
    }
  }, [isIntersecting]);

  return (
    <div className={styles.root}>
      {isError ? (
        <MessageBox message={"Failed to fetch products from API"} />
      ) : isLoading ? (
        <Spinner text="Loading Products . . ." />
      ) : (
        <div className={styles.cards_container}>
          {products.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              image={item.images[0]}
              price={item.price}
              id={item.id}
            />
          ))}
          <div
            ref={(el) => {
              spinnerRef.current = el;
              setIsSpinnerRefVisible((prev) => !prev);
            }}
          >
            <Spinner text="Loading more products..." />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
