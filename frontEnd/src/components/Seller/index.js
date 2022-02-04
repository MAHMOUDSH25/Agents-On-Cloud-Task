import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import ProductInfo from "./ProductInfo";
import "./style.css";

export default function Seller({ token }) {
  const [product, setProduct] = useState("");

  useEffect(() => {
    // here we send request to server to get seller product
    // if the seller did not add any product we will get null
    const getSellerProduct = async () => {
      try {
        const product = await axios.get("http://localhost:5000/product", {
          headers: { authorization: `Bearer ${token}` },
        });
        setProduct(product.data);
      } catch (error) {}
    };
    if (token) {
      getSellerProduct();
    }
  }, [token]);

  // here we will render form to add new product if seller did not added it
  // and if there is a product we will render a ProductInfo component.
  return (
    <div>
      {product === null ? (
        <AddProduct token={token} setProduct={setProduct} />
      ) : (
        <ProductInfo token={token} product={product} />
      )}
    </div>
  );
}
